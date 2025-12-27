import { Category, CategoryWithPath } from '@/types/category';
import styles from '@/styles/components/categories/categoryPost.module.css';
import {
  Car,
  Sofa,
  Briefcase,
  PawPrint,
  Baby,
  Dumbbell,
  BriefcaseBusiness,
  Shirt,
  Wrench,
  Home as HomeIcon2,
  Music,
  Smartphone,
  Monitor
} from 'lucide-react';

export function findCategoriesWithPaths(categories: Category[]): CategoryWithPath[] {
  const targetSlugs = [
    'cars-for-sale',
    'apartments-villas-for-rent',
    'mobile-phones',
    'laptops-tablets-computers',
    'vacation-rentals-and-weekend-getaways',
    'motorcycles-atv',
    'home-decoration-accessories',
    'jobs-available'
  ];

  const result: CategoryWithPath[] = [];

  function findCategoryAndBuildPath(
    cats: Category[],
    targetSlug: string,
    currentPath: string = ''
  ): string | null {
    for (const cat of cats) {
      const newPath = currentPath ? `${currentPath}/${cat.slug}` : cat.slug;

      if (cat.slug === targetSlug) {
        return newPath;
      }

      if (cat.children && cat.children.length > 0) {
        const childPath = findCategoryAndBuildPath(cat.children, targetSlug, newPath);
        if (childPath) return childPath;
      }
    }
    return null;
  }

  for (const targetSlug of targetSlugs) {
    for (const topLevelCat of categories) {
      const fullPath = findCategoryAndBuildPath([topLevelCat], targetSlug);
      if (fullPath) {
        const findCategory = (cats: Category[]): Category | null => {
          for (const cat of cats) {
            if (cat.slug === targetSlug) return cat;
            if (cat.children?.length) {
              const found = findCategory(cat.children);
              if (found) return found;
            }
          }
          return null;
        };

        const categoryObj = findCategory([topLevelCat]);
        if (categoryObj) {
          result.push({
            category: categoryObj,
            fullPath: fullPath
          });
        }
        break;
      }
    }
  }

  return result.sort((a, b) =>
    targetSlugs.indexOf(a.category.slug) - targetSlugs.indexOf(b.category.slug)
  );
}

export function getAllCategoriesHierarchy(categories: Category[]): Array<{
  parent: Category;
  children: Array<{
    category: Category;
    fullPath: string;
    subChildren?: Array<{
      category: Category;
      fullPath: string;
    }>;
  }>;
}> {
  const result: Array<{
    parent: Category;
    children: Array<{
      category: Category;
      fullPath: string;
      subChildren?: Array<{
        category: Category;
        fullPath: string;
      }>;
    }>;
  }> = [];

  categories.forEach((parentCategory) => {
    if (parentCategory.children && parentCategory.children.length > 0) {
      const children: Array<{
        category: Category;
        fullPath: string;
        subChildren?: Array<{
          category: Category;
          fullPath: string;
        }>;
      }> = [];

      parentCategory.children.forEach((childCategory) => {
        const childFullPath = `${parentCategory.slug}/${childCategory.slug}`;

        const childItem: {
          category: Category;
          fullPath: string;
          subChildren?: Array<{
            category: Category;
            fullPath: string;
          }>;
        } = {
          category: childCategory,
          fullPath: childFullPath
        };

        if (childCategory.children && childCategory.children.length > 0) {
          childItem.subChildren = childCategory.children.map((subChild) => ({
            category: subChild,
            fullPath: `${parentCategory.slug}/${childCategory.slug}/${subChild.slug}`
          }));
        }

        children.push(childItem);
      });

      if (children.length > 0) {
        result.push({
          parent: parentCategory,
          children: children.sort((a, b) =>
            (a.category.displayPriority || 0) - (b.category.displayPriority || 0)
          )
        });
      }
    }
  });

  return result.sort((a, b) =>
    (a.parent.displayPriority || 0) - (b.parent.displayPriority || 0)
  );
}

export const categoryImages: Record<string, string> = {
  'vehicles': '/images/home/categories/category1.png',
  'properties': '/images/home/categories/category2.png',
  'mobile-phones-accessories': '/images/home/categories/category13.png',
  'electronics-home-appliances': '/images/home/categories/category3.png',
  'home-furniture-decor': '/images/home/categories/category4.png',
  'business-industrial': '/images/home/categories/category5.png',
  'pets': '/images/home/categories/category6.png',
  'kids-babies': '/images/home/categories/category7.png',
  'sports-equipment': '/images/home/categories/category8.png',
  'hobbies-music-art-books': '/images/home/categories/category8.png',
  'jobs': '/images/home/categories/category10.png',
  'fashion-beauty': '/images/home/categories/category11.png',
  'services': '/images/home/categories/category12.png',
};


export const categoryIcons: Record<string, React.ReactNode> = {
  'vehicles': <Car className={styles.categoryIcon} />,
  'properties': <HomeIcon2 className={styles.categoryIcon} />,
  'mobile-phones-accessories': <Smartphone className={styles.categoryIcon} />,
  'home-furniture-decor': <Sofa className={styles.categoryIcon} />,
  'business-industrial': <BriefcaseBusiness className={styles.categoryIcon} />,
  'pets': <PawPrint className={styles.categoryIcon} />,
  'sports-equipment': <Dumbbell className={styles.categoryIcon} />,
  'hobbies-music-art-books': <Music className={styles.categoryIcon} />,
  'kids-babies': <Baby className={styles.categoryIcon} />,
  'electronics-home-appliances': <Monitor className={styles.categoryIcon} />,
  'jobs': <Briefcase className={styles.categoryIcon} />,
  'fashion-beauty': <Shirt className={styles.categoryIcon} />,
  'services': <Wrench className={styles.categoryIcon} />,
};


export const getCategoryImage = (slug: string) => {
  return categoryImages[slug] || '/images/home/categories/default.png';
};