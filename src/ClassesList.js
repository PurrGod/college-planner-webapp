import React, { useState, useEffect } from 'react';
import { MongoClient } from 'mongodb';

const ClassesList = ({ majorId }) => {
  const [classesList, setClassesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uri = "mongodb+srv://ymalegao:hackathon@major-class.bcgywbx.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const handleDragStart = (e, className) => {
    e.dataTransfer.setData("text", className);
    e.dataTransfer.setData("sourceGrid", "classes-list");
  };

  // Fetch classes when the component mounts or when majorId changes
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      try {
        // Connect the client to the server
        await client.connect();
        
        // Query the database for the major with the given majorId
        const database = client.db("Majors"); // Replace with your database name
        const collection = database.collection("classes"); // Replace with your collection name
        const major = await collection.findOne({ name:"Computer Science: Computer Game Design B.S."});

        // Set the classesList state to the requirements of the queried major
        setClassesList(major.requirements);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        await client.close();
      }
    };

    if (majorId) {
      fetchClasses();
    }
  }, [majorId, client]); // Dependency array to re-run the effect when majorId changes

  if (isLoading) {
    return <p>Loading classes...</p>;
  }

  if (error) {
    return <p>Error fetching classes: {error.toString()}</p>;
  }

  return (
    <div>
      <p>Classes for Major ID {majorId}:</p>
      {classesList.length > 0 ? (
        classesList.map((className, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, className)}
          >
            {className}
          </div>
        ))
      ) : (
        <p>No classes found for this major.</p>
      )}
    </div>
  );
};

export default ClassesList;
