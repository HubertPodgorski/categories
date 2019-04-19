import React from 'react'
import styles from './CategoriesWrapper.module.scss'
import Categories from '../Categories/Categories'

const CategoriesWrapper = () => (
    <section className={styles['categories-wrapper']}>
        <Categories />
    </section>
)

export default CategoriesWrapper
