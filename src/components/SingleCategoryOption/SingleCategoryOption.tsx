import React from 'react'
import { object, func } from 'prop-types'
import styles from './SingleCategoryOption.module.scss'
import { Category } from '../../services/CategoriesService'

interface State {}

interface Props {
    category: Category;
    onCategoryPick: Function;
}

class SingleCategoryOption extends React.Component<Props, State> {
    static propTypes = {
        category: object.isRequired,
        onCategoryPick: func.isRequired,
    }

    onCategoryClickHandler = (): void => {
        this.props.onCategoryPick(this.props.category.id)
    }

    render() {
        return (
            <li onClick={this.onCategoryClickHandler}>
                {this.props.category.name}
            </li>
        )
    }
}

export default SingleCategoryOption
