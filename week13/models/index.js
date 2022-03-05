const Location = require("./Location");
const Traveller = require("./Traveller");
const Trip = require("./Trip");

Traveller.belongsToMany(Location, {
    through: {
        model: Trip,
        unique: false,
    },
    as: "planned_trips",
});

Location.belongsToMany(Traveller, {
    through: {
        model: Trip,
        unique: false,
    },
    as: "location_travellers",
});

module.exports = { Location, Traveller, Trip };
