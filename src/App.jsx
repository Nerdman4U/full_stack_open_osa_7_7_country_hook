import React, { useState, useEffect } from 'react'
import axios from 'axios'

// custom hook
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// custom hook
const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"
  console.log('useCountry() name:', name)

  useEffect(() => {
    if (!name) return
    fetch(`${baseUrl}name/${name}`)
    .then(response => {
      if (response.status === 404) {
        setCountry({ found: false })
        return
      }
      response.json().then(data => {
        console.log(data)
        setCountry({ found: true, data: data })
      })
    })
  }, [name])

  return country
}

// component
const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  console.log('Country data:', country.data)

  return (
    <div className="mt-4">
      <h3 className="text-2xl text-blue-600">{country.data.name.common} ({country.data.name.official})</h3>
      <table className="table-auto border-separate border-spacing-1 border border-blue-400 my-4">
        <caption className="rotate-180">Details</caption>
        <tbody>
          <tr>
            <td className="border border-blue-400 p-2">capital</td>
            <td className="border border-blue-400 p-2">{country.data.capital}</td>
          </tr>
          <tr>
            <td className="border border-blue-400 p-2">area</td>
            <td className="border border-blue-400 p-2">{country.data.area}</td>
          </tr>
          <tr>
            <td className="border border-blue-400 p-2">population</td>
            <td className="border border-blue-400 p-2">{country.data.population}</td>
          </tr>
        </tbody>
      </table>
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('nepal')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value.toLowerCase())
  }

  return (
    <div className="m-12">
      <h1 className="text-3xl font-bold text-blue-600">Country information</h1>
      <p className="italic">Use below form to search</p>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App