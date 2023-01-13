export default function Jumbotron({ title, subTilte="GUETT-GUI" }){
    return (
        <div className="container-fluid jumbotron ">
            <div className="row">
                <div className="col text-center p-5  ">
                    <h1>{title }</h1>
                    <p className="leard">{subTilte}</p>
                </div>
            </div>
        </div>
    )
}