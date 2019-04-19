import React from 'react'
import { arrayOf, object, func } from 'prop-types'
import styles from './CategoryList.module.scss'
import { Category } from '../../services/CategoriesService'
import SingleCategoryOption from '../SingleCategoryOption/SingleCategoryOption'

const renderList = (categoryList: Category[], onCategoryPick: Function) =>
    categoryList.map((category: Category) => (
        <SingleCategoryOption
            key={category.id}
            onCategoryPick={onCategoryPick}
            category={category}
        />
    ))

const CategoryList = ({
    categoryList,
    onCategoryPick,
}: {
    categoryList: Category[],
    onCategoryPick: Function,
}) => <ul>{renderList(categoryList, onCategoryPick)}</ul>

CategoryList.propTypes = {
    categoryList: arrayOf(object).isRequired,
    onCategoryPick: func.isRequired,
}

export default CategoryList
