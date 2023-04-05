const CatCard = (catData) => {
    return (
        // <div>hello world cat card</div>
        <div className="row">
            <div className="col s12 m7">
                <div className="card small">
                    <div className="card-image">
                        <img src={catData.url}></img>
                        <span className="card-title">{catData.name} for sale!</span>
                    </div>
                    <div className="card-content">
                        <p>{catData.country}</p><p>{catData.temperament}</p>
                    </div>
                    <div className="card-action">
                        <a href="#">Buy this moggy</a>
                    </div>
                </div>
            </div>
        </div>
    );
} 
export default CatCard;