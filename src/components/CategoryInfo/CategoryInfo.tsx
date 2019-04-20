import React from 'react'
import { object, func } from 'prop-types'
import styles from './CategoryInfo.module.scss'
import { Category } from '../../services/CategoriesService'

interface State {}

interface Props {
    category: Category;
    onGoBackClick: Function;
}

const staticTexts = {
    yourCategoryIdIs: 'Your category id is:',
    yourCategoryNameIs: 'Your category name is:',
    yourParentCategoryIdIs: 'Your parent category id is:',
    changeCategory: 'Change category',
}

class CategoryInfo extends React.Component<Props, State> {
    static propTypes = {
        category: object.isRequired,
        onGoBackClick: func.isRequired,
    }

    onCategoryChangeClick = (): void => {
        this.props.onGoBackClick()
    }

    render() {
        const { category } = this.props
        return (
            <section className={styles['category-info']}>
                <div className={styles['category-info__text']}>
                    {staticTexts.yourCategoryIdIs} "{category.id}"
                </div>

                <div className={styles['category-info__text']}>
                    {staticTexts.yourCategoryNameIs} {category.name}
                </div>

                <div className={styles['category-info__text']}>
                    {staticTexts.yourParentCategoryIdIs} "{category.parentId}"
                </div>

                <button
                    className={styles['category-info__change-button']}
                    onClick={this.onCategoryChangeClick}
                >
                    {staticTexts.changeCategory}
                </button>
            </section>
        )
    }
}

export default CategoryInfo
