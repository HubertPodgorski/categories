import React from 'react'
import { object, arrayOf } from 'prop-types'
import styles from './Breadcrumbs.module.scss'
import { Breadcrumb } from '../../services/BreadcrumbsService'

const renderBreadcrumbs = (breadcrumbs: Breadcrumb[]) =>
    breadcrumbs.map((breadcrumb: Breadcrumb, index: number) => (
        <span className={styles['breadcrumbs__breadcrumb']} key={breadcrumb.id}>
            {index > 0 && ' -'} {breadcrumb.label}
        </span>
    ))

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => (
    <section>{renderBreadcrumbs(breadcrumbs)}</section>
)

Breadcrumbs.propTypes = {
    breadcrumbs: arrayOf(object).isRequired,
}

export default Breadcrumbs
