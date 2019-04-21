import React from 'react'
import styles from './Categories.module.scss'
import CategoryList from '../../components/CategoryList/CategoryList'
import CategoriesService, { Category } from '../../services/CategoriesService'
import CategoryInfo from '../../components/CategoryInfo/CategoryInfo'
import { globalSettings } from '../../consts/settings'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import BreadcrumbsService, {
    Breadcrumb,
} from '../../services/BreadcrumbsService'

const staticTexts = {
    goBack: 'Go back',
    chooseOneOfMainCategories: 'Choose one of main categories',
}

interface State {
    currentCategoryId: string;
    categoryList: Category[];
    isLast: boolean;
    breadcrumbs: Breadcrumb[];
    isAtMainCategories: boolean;
}

interface Props {
    categoryList: Category[];
}

class Categories extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const { categoryList } = props

        this.state = {
            currentCategoryId: globalSettings.mainCategoryId,
            categoryList: CategoriesService.getCategoryListByParentId(
                globalSettings.mainCategoryId,
                categoryList
            ),
            isLast: CategoriesService.isCategoryLastById(
                globalSettings.mainCategoryId,
                categoryList
            ),
            breadcrumbs: [],
            isAtMainCategories: true,
        }
    }

    updateState(givenCategoryId: string, breadcrumbs: Breadcrumb[]): void {
        const { categoryList } = this.props

        this.setState({
            currentCategoryId: givenCategoryId,
            categoryList: CategoriesService.getCategoryListByParentId(
                givenCategoryId,
                categoryList
            ),
            isLast: CategoriesService.isCategoryLastById(
                givenCategoryId,
                categoryList
            ),
            breadcrumbs,
            isAtMainCategories:
                givenCategoryId === globalSettings.mainCategoryId,
        })
    }

    onCategoryPick = (categoryId: string): void => {
        const breadcrumbsWithOptionalNewItemAdded = BreadcrumbsService.getBreadcrumbsWithOptionalNewItemAdded(
            categoryId,
            this.props.categoryList,
            this.state.breadcrumbs
        )

        this.updateState(categoryId, breadcrumbsWithOptionalNewItemAdded)
    }

    onGoBackClick = (): void => {
        const parentId = CategoriesService.getParentIdByCategoryId(
            this.state.currentCategoryId,
            this.props.categoryList
        )

        const breadcrumbsWithRemovedLastItem = [...this.state.breadcrumbs]
        breadcrumbsWithRemovedLastItem.pop()

        this.updateState(parentId, breadcrumbsWithRemovedLastItem)
    }

    getCategoryByCurrentCategoryId(): Category {
        const defaultTextValue = '---'

        const category = CategoriesService.getCategoryById(
            this.state.currentCategoryId,
            this.props.categoryList
        )

        return category
            ? category
            : {
                  name: defaultTextValue,
                  id: defaultTextValue,
                  parentId: defaultTextValue,
              }
    }

    render() {
        return (
            <section className={styles['categories']}>
                {!this.state.isAtMainCategories && (
                    <div className={styles['categories__header']}>
                        <Breadcrumbs breadcrumbs={this.state.breadcrumbs} />

                        {!this.state.isLast && (
                            <button
                                className={styles['categories__go-back-button']}
                                onClick={this.onGoBackClick}
                            >
                                {staticTexts.goBack}
                            </button>
                        )}
                    </div>
                )}

                {this.state.isAtMainCategories && (
                    <div className={styles['categories__header']}>
                        {staticTexts.chooseOneOfMainCategories}
                    </div>
                )}

                {!this.state.isLast && (
                    <CategoryList
                        categoryList={this.state.categoryList}
                        onCategoryPick={this.onCategoryPick}
                    />
                )}

                {this.state.isLast && (
                    <CategoryInfo
                        category={this.getCategoryByCurrentCategoryId()}
                        onGoBackClick={this.onGoBackClick}
                    />
                )}
            </section>
        )
    }
}

export default Categories
