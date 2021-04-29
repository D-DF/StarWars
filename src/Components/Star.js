import { useEffect, useState } from 'react';

const Star = () => {
    const [planet, setPlanets]  = useState([])
    const [loading, setLoading] = useState(false)
    const [apiCall, setApiCall] = useState(0)
    const [page, setPage]       = useState(1)

    console.log(apiCall)
    const addPlanet = () => {
        setPage(page +1)
    }
    
    useEffect(() => {
        setLoading(true)
        const url = `https://swapi.dev/api/planets/?page=${page}`;
        fetch(url)
            .then((response) => {
                setApiCall(a => a + 1)
                if(!response.ok) {
                    throw new Error(`Planète introuvable, status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                setLoading(false)
                setPlanets(planet => [...planet, ...data.results])
            })
            .catch((error) => {
                alert(error.message)
            })
            
    }, [page])
    
    return (
        <section className="container py-5" >
            <h1 className="mb-5">Planètes dans l'univers de Star Wars</h1>
        <div className="row">
            {planet.map((el) => {
                return (
                    <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={el.name}>
                        <article className="p-3 planete">
                            <h2 className="h5">{el.name}</h2>
                            <p className="mb-0"><b>Population:</b> <br/>{el.population}</p> 
                            <p className="mb-0"><b>Climat:</b> <br/>{el.climate}</p> 
                        </article> 
                    </div>   
                )
            })}
            {loading &&<p>Loading...</p>}
        </div>
        {page > 6? <p className="bg-light w-100%">Voici la liste des planètes dans starWars</p> : <button type="button" className="btn btn-light" onClick={addPlanet}>Next</button>}
        </section>
    )
};

export default Star;