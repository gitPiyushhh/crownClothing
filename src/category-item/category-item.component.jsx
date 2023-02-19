import './category-item.component.scss';

const CategoryItem = ({ category }) => {
    const {imageUrl, title, id} = category;
    return (
        <div className="category-container" key={id}>
          <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
          }}/>

          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop now</p>
          </div>
        </div>
      );
}

export default CategoryItem;