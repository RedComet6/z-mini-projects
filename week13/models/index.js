const Location = require("./Location");
const Traveller = require("./Traveller");
const Trip = require("./Trip");

Location.hasOne(Traveller, {
    foreignKey: "",
    onDelete: "CASCADE",
});

Traveller.belongsTo(Location, {
    foreignKey: "",
});

module.exports = { Location, Traveller, Trip };
