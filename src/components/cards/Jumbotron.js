export default function Jumbotron({ title, subTilte="GUETT-GUI" }){
    return (
        <div className="container-fluid bg-primary">
            <div className="row">
                <div className="col text-center p-5 bg-primary ">
                    <h1>{title }</h1>
                    <p className="leard">{subTilte}</p>
                </div>
            </div>
        </div>
    )
}