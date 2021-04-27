import { useEffect, useState } from 'react';

const Star = () => {
    const [planet, setPlanets]  = useState([])
    const [loading, setLoading] = useState(false)
    const [apiCall, setApiCall] = useState(0)
    const [error, setError]     = useState("")
    
    useEffect(() => {
        setLoading(true)
        const url = `https://swapi.dev/api/planets`;

        fetch(url)
            .then((response) => {
                setApiCall(a => a + 1)
                if(!response.ok) {
                    throw new Error(`Planète introuvable, status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setPlanets(data.results)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    
    

    return (
        <section className="container py-5" >
            <h1 className="mb-5">Planètes dans l'univers de Star Wars</h1>
            {loading && <p className="h1">Loading...</p>}
        <div className="row">
            {planet.map((el) => {
                return (
                    <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={el.name}>
                        <article className="bg-warning p-3">
                            <h2 className="h5">{el.name}</h2>
                            <p className="mb-0"><b>Population:</b> <br/>{el.population}</p> 
                            <p className="mb-0"><b>Climat:</b> <br/>{el.climate}</p> 
                        </article> 
                    </div>   
                )
            })}
            
        </div>
        <button type="button" className="btn btn-dark">Suivantes</button>
        </section>
    )
    
};

export default Star;