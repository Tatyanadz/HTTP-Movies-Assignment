import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const initialMovie = {
    id: '',
    title: '',
    director: '', 
    metascore: '',
    starts: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie)

    useEffect(() => {
        console.log(props.match.params.id)
        console.log(movie)

        const id = props.match.params.id

        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(result => { setMovie(result.data) })
          .catch(err => console.log(err))
    }, [props.match.params.id])

    const handleChange = event => {
        setMovie({ ...movie, [event.target.name]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        axios
          .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
          .then(result => { props.history.push('/') })
          .catch(err => { console.log(err) })
    }

    return (
        <FormDiv>
          <h1>Update Movies</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={movie.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="director"
              placeholder="Director"
              value={movie.director}
              onChange={handleChange}
            />
            <input
              type="number"
              name="metascore"
              placeholder="Metascore"
              value={movie.metascore}
              onChange={handleChange}
            />
            <input
              type="text"
              name="stars"
              placeholder="Stars"
              value={movie.stars}
              onChange={handleChange}
            />
            <StyledButton>Save</StyledButton>
          </form>
        </FormDiv>
    );  
}

export default UpdateMovie

const FormDiv = styled.form`
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12), 0 5px 2px rgba(0, 0, 0, 0.24);
  width: 100%;
  height: 16em;
  max-width: 400px;
  padding: 15px;
  margin: 16px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  input {
    display: flex;
    padding: 6px;
    background: none;
    border: none;
    color: black;
    border-bottom: 1px solid black;
    margin-top: 0;
    font-size: 1em;
    margin-left: 26%;
    ::placeholder {
      color: black;
    }
`;

const StyledButton = styled.button`
  background: light-yellow;
  font-size: 1.1em;
  margin: 0.5em;
  padding: 5px 10px;
  border: 1px solid grey;
  margin-top: 5%;
  margin-bottom: 5%;
`;