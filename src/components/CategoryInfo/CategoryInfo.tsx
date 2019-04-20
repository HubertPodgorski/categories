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
            <section>
                <button onClick={this.onCategoryChangeClick}>Change</button>

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
    }
}

export default CategoryInfo
