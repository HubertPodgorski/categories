import React from 'react'
import styles from './Categories.module.scss'
import CategoryList from '../../components/CategoryList/CategoryList'
import { categoriesMock } from '../../consts/mocks'
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

interface Props {}

class Categories extends React.Component<Props, State> {
    constructor(props: {}) {
        super(props)

        this.state = {
            currentCategoryId: globalSettings.mainCategoryId,
            categoryList: CategoriesService.getCategoryListByParentId(
                globalSettings.mainCategoryId,
                categoriesMock
            ),
            isLast: CategoriesService.isCategoryLastById(
                globalSettings.mainCategoryId,
                categoriesMock
            ),
            breadcrumbs: [],
            isAtMainCategories: true,
        }
    }

    updateState(givenCategoryId: string, breadcrumbs: Breadcrumb[]): void {
        this.setState({
            currentCategoryId: givenCategoryId,
            categoryList: CategoriesService.getCategoryListByParentId(
                givenCategoryId,
                categoriesMock
            ),
            isLast: CategoriesService.isCategoryLastById(
                givenCategoryId,
                categoriesMock
            ),
            breadcrumbs,
            isAtMainCategories:
                givenCategoryId === globalSettings.mainCategoryId,
        })
    }

    onCategoryPick = (categoryId: string): void => {
        const breadcrumbsWithOptionalNewItemAdded = BreadcrumbsService.getBreadcrumbsWithOptionalNewItemAdded(
            categoryId,
            categoriesMock,
            this.state.breadcrumbs
        )

        this.updateState(categoryId, breadcrumbsWithOptionalNewItemAdded)
    }

    onGoBackClick = (): void => {
        const parentId = CategoriesService.getParentIdByCategoryId(
            this.state.currentCategoryId,
            categoriesMock
        )

        const breadcrumbsWithRemovedLastItem = [...this.state.breadcrumbs]
        breadcrumbsWithRemovedLastItem.pop()

        this.updateState(parentId, breadcrumbsWithRemovedLastItem)
    }

    getCategoryBydCurrentCategoryId(): Category {
        const defaultTextValue = '---'

        const category = CategoriesService.getCategoryById(
            this.state.currentCategoryId,
            categoriesMock
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
                        category={this.getCategoryBydCurrentCategoryId()}
                        onGoBackClick={this.onGoBackClick}
                    />
                )}
            </section>
        )
    }
}

export default Categories
