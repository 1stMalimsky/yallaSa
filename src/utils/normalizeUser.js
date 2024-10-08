
const normalizeUser = (object) => {

    if (!object.name) {
        object.name = {}
    }
    object.name.firstName = object.firstName;
    object.name.middleName = object.middleName;
    object.name.lastName = object.lastName;
    if (!object.address) {
        object.address = {}
    }
    object.address.state = object.state || "";
    object.address.country = object.country;
    object.address.city = object.city;
    object.address.street = object.street;
    object.address.houseNumber = object.houseNumber;
    object.address.zip = object.zip;

    if (!object.image) {
        object.image = {}
    }
    object.image.url = object.url;
    object.image.alt = object.alt;

    delete object.firstName;
    delete object.middleName;
    delete object.lastName;
    delete object.state;
    delete object.country;
    delete object.city;
    delete object.street;
    delete object.houseNumber;
    delete object.zip;
    delete object.url;
    delete object.alt;


    return object;
}

export default normalizeUser; 