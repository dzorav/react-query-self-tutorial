import React from 'react'
import { Routes as RoutesParent, Route } from 'react-router-dom'
import Post from './Post'
import StarWars from './StarWars'

const Routes = () => {
    return (
        <RoutesParent>
            <Route path="/posts" element={<Post />} />
            <Route path="/sw" element={<StarWars />} />
            <Route path='*' element={<h3>404 Page Not Found</h3>} />
        </RoutesParent>
    )
}

export default Routes