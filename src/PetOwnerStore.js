import {
  action,
  computed,
  makeObservable,
  observable,
  autorun,
  runInAction,
} from "mobx";

class PetOwnerStore {
  pets = [];
  owners = [];

  constructor() {
    makeObservable(this, {
      pets: observable,
      owners: observable,
      totalOwners: computed,
      totalPets: computed,
      storeDetails: computed,
      getPetsByOwner: action,
      createPet: action,
      createOwner: action,
      updatePet: action,
      updateOwner: action,
      deletePet: action,
      deleteOwner: action,
      assignOwnerToPet: action,
    });
    autorun(this.logStoreDetails);
    runInAction(this.prefetchData);
  }

  // total number owners
  get totalOwners() {
    return this.owners.length;
  }

  // total number of pets
  get totalPets() {
    return this.pets.length;
  }

  // Get pets using ownerId
  getPetsByOwner(ownerId) {
    return this.pets.filter((pet) => {
      return pet.owner && pet.owner.id === ownerId;
    });
  }

  createPet(pet = { id: 0, name: "", type: "", breed: "", owner: null }) {
    this.pets.push(pet);
    return pet;
  }

  createOwner(owner = { id: 0, firstName: "", lastName: "" }) {
    this.owners.push(owner);
    return owner;
  }

  updateOwner(ownerId, update) {
    const ownerIndexAtId = this.owners.findIndex(
      (owner) => owner.id === ownerId
    );
    if (ownerIndexAtId > -1 && update) {
      this.owners[ownerIndexAtId] = update;
      return this.owners[ownerIndexAtId];
    }
  }

  updatePet(petId, update) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    if (petIndexAtId > -1 && update) {
      this.pets[petIndexAtId] = update;
      return this.pets[petIndexAtId];
    }
  }

  deletePet(petId) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    if (petIndexAtId > -1) {
      this.pets.splice(petIndexAtId, 1);
    }
  }

  deleteOwner(ownerId) {
    const ownerIndexAtId = this.owners.findIndex(
      (owner) => owner.id === ownerId
    );
    if (ownerIndexAtId > -1) {
      this.owners.splice(ownerIndexAtId, 1);
      // Update all the pets with the ownerId to null
      this.pets = this.pets.map((pet) => {
        if (pet.owner && pet.owner.id === ownerId) {
          pet.owner = null;
        }
        return pet;
      });
    }
  }

  // assign an owner using ownerId to a pet using petId
  assignOwnerToPet(ownerId, petId) {
    const petAtIndex = this.pets.find(
      (pet) => parseInt(pet.id) === parseInt(petId)
    );
    const ownerAtIndex = this.owners.find(
      (owner) => parseInt(owner.id) === parseInt(ownerId)
    );
    if (petAtIndex && ownerAtIndex) {
      petAtIndex.owner = ownerAtIndex;
    }
  }

  get storeDetails() {
    return `We have ${this.totalPets} pets and ${this.totalOwners} owners, so far!!!`;
  }

  logStoreDetails = () => {
    console.log(this.storeDetails);
  };

  prefetchData = () => {
    const owners = [{ firstName: "Aleem", lastName: "Isiaka", id: 1 }];
    const pets = [
      {
        id: 1,
        name: "Lincy",
        breed: "Siamese",
        type: "Cat",
        ownerId: 1,
      },
    ];

    setTimeout(() => {
      console.log("Fetch complete update store");
      owners.map((pet) => this.createOwner(pet));
      pets.map((pet) => {
        this.createPet(pet);
        this.assignOwnerToPet(pet.ownerId, pet.id);
        return pet;
      });
    }, 3000);
  };
}

export default PetOwnerStore;
