import React from 'react'
import styles from './CategoriesWrapper.module.scss'
import Categories from '../Categories/Categories'
import { categoriesMock } from '../../consts/mocks'

const CategoriesWrapper = () => (
    <section className={styles['categories-wrapper']}>
        <Categories categoryList={categoriesMock} />
    </section>
)

export default CategoriesWrapper
