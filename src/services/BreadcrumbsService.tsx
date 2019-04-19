import CategoriesService, { Category } from './CategoriesService'

export interface Breadcrumb {
    label: string;
    id: string;
}

export default class BreadcrumbsService {
    static getBreadcrumbsWithOptionalNewItemAdded(
        categoryId: string,
        categories: Category[],
        currentBreadcrumbs: Breadcrumb[]
    ): Breadcrumb[] {
        const currentCategory = CategoriesService.getCategoryById(
            categoryId,
            categories
        )
        let breadcrumbsWithNewItemAdded = [...currentBreadcrumbs]
        if (currentCategory) {
            breadcrumbsWithNewItemAdded = [
                ...breadcrumbsWithNewItemAdded,
                { id: currentCategory.id, label: currentCategory.name },
            ]
        }

        return breadcrumbsWithNewItemAdded
    }
}
