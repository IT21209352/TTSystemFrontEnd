import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        // Fetch data from server to validate token
        fetch('http://localhost:5173/usermanagemnt', {
            method: 'GET',
            credentials: 'include' // Send cookies along with the request
        })
        .then(response => {
            if (response.ok) {
                setIsAuthenticated(true); // User is authenticated
            } else {
                setIsAuthenticated(false); // User is not authenticated
            }
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error verifying token:', error);
            setIsAuthenticated(false); // User is not authenticated
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator while checking authentication
    }

    if (!isAuthenticated) {
      // Navigate to "/stdDashboard" route if user is not authenticated
      navigate("/signIn");
      return null; // No need to render anything while navigating
  }

    // If user is authenticated, render the adminDashboard content
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>This is the protected admin dashboard content.</p>
        </div>
    );
}

export default AdminDashboard;
