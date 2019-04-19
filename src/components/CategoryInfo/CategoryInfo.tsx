import React from 'react'
import { object, oneOfType } from 'prop-types'
import styles from './CategoryInfo.module.scss'
import { Category } from '../../services/CategoriesService'

const staticTexts = {
    yourCategoryIdIs: 'Your category id is:',
    yourCategoryNameIs: 'Your category name is:',
    yourParentCategoryIdIs: 'Your parent category id is:',
}

const CategoryInfo = ({ category }: { category: Category }) => (
    <section>
        <div>
            {staticTexts.yourCategoryIdIs} "{category.id}"
        </div>

        <div>
            {staticTexts.yourCategoryNameIs} {category.name}
        </div>

        <div>
            {staticTexts.yourParentCategoryIdIs} "{category.parentId}"
        </div>
    </section>
)

CategoryInfo.propTypes = {
    category: object.isRequired,
}

export default CategoryInfo
