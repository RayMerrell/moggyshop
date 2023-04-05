const CatCard = (catData) => {
  return (
    // <div>hello world cat card</div>
    <div className="shadowCard card small">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator mainCatPic" src={catData.url} />
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          {catData.name} the {catData.breed}<i className="material-icons right">{catData.temperament}</i>
        </span>
        <p>
          <a href="#">This is a link</a>
        </p>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
        {catData.breed}<i className="material-icons right">close</i>
        </span>
        <p>
          {catData.description}
        </p>
      </div>
    </div>
  );
};
export default CatCard;
