import React from 'react'
import styles from './Categories.module.scss'
import CategoryList from '../../components/CategoryList/CategoryList'
import { categoriesMock } from '../../consts/mocks'
import CategoriesService, { Category } from '../../services/CategoriesService'
import CategoryInfo from '../../components/CategoryInfo/CategoryInfo'
import { globalSettings } from '../../consts/settings'

const staticTexts = {
    goBack: 'Go back',
}

interface State {
    currentCategoryId: string;
    categoryList: Category[];
    isLast: boolean;
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
        }
    }

    updateStateByCategoryId(givenCategoryId: string): void {
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
        })
    }

    onCategoryPick = (categoryId: string): void => {
        this.updateStateByCategoryId(categoryId)
    }

    onGoBackClick = (): void => {
        const parentId = CategoriesService.getParentIdByCategoryId(
            this.state.currentCategoryId,
            categoriesMock
        )

        this.updateStateByCategoryId(parentId)
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
                <button onClick={this.onGoBackClick}>
                    {staticTexts.goBack}
                </button>

                {!this.state.isLast && (
                    <CategoryList
                        categoryList={this.state.categoryList}
                        onCategoryPick={this.onCategoryPick}
                    />
                )}

                {this.state.isLast && (
                    <CategoryInfo
                        category={this.getCategoryBydCurrentCategoryId()}
                    />
                )}
            </section>
        )
    }
}

export default Categories
