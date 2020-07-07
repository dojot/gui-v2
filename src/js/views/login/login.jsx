import React, { Component, useEffect, useState } from 'react'

const login = (props) => {       
    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <p>Usuário</p>
                <input type='text' name="user"/>
                <p>Senha</p>
                <input type="password" name="password"/>
                <p>
                <input type="submit" value="Login"/>
                </p>
            </form> 
        </div>
    );
}

export default login;