import React from "react";
import { observer } from "mobx-react-lite";

function PetList({ store }) {
  const handleAddPet = () => {
    const name = prompt("Name of the pet");
    const type = prompt("Type of the pet");
    const breed = prompt("Breed of the pet");
    const ownerId = prompt("Owner's Id of the pet");

    const pet = store.createPet({ id: Date.now(), name, breed, type });
    store.assignOwnerToPet(ownerId, pet.id);
  };

  const handleUpdatePet = (pet) => {
    pet.name = prompt("Name of the pet", pet.name);
    pet.type = prompt("Type of the pet", pet.type);
    pet.breed = prompt("Breed of the pet", pet.breed);
    const ownerId = prompt("Owner's Id of the pet", pet.owner?.id);
    store.updatePet(pet.id, pet);
    if (ownerId !== pet.owner?.id) {
      store.assignOwnerToPet(ownerId, pet.id);
    }
  };

  const handleDeletePet = (pet) => {
    store.deletePet(pet.id);
  };

  return (
    <div>
      <p>{store.storeDetails}</p>
      <table>
        <thead>
          <tr>
            <th>##</th>
            <th>Pet Name</th>
            <th>Pet Type</th>
            <th>Pet Breed</th>
            <th>Owner</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {store.pets.map((pet) => {
            return (
              <tr key={pet.id}>
                <td>{pet.id}</td>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>{pet.breed}</td>
                <td>
                  {pet.owner
                    ? `${pet.owner?.firstName} ${pet.owner?.lastName}`
                    : "---"}
                </td>
                <td>
                  <button
                    onClick={() => handleDeletePet(pet)}
                    style={{ marginRight: "1rem" }}
                  >
                    Delete {pet.name}
                  </button>
                  <button onClick={() => handleUpdatePet(pet)}>
                    Update {pet.name}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleAddPet}>+ New pet</button>
    </div>
  );
}

export default observer(PetList);
