// include current time in jumbo
let today = moment();

$("#time").text(today.format("MMM DD, YYYY [at] hh:mm:ss a"));

function printProjectTable(name, type, rate, date) {
    const projectRow = $("<tr>");
    const projectNameCell = $("<td>").text(name);
    const projectTypeCell = $("<td>").text(type);
    const hourlyRateCell = $("<td>").text(`$${rate}`);
    const projectDateCell = $("<td>").text(moment(date).format("MM/DD/YY"));
    const projectDueDateCell = $("<td>").text(moment(date).diff(moment(), "days"));
    const totalEarnings = calculateTotalEarnings(rate, date);
    const totalEarningsCell = $("<td>").text(`$${totalEarnings}`);
    const projectDeleteCell = $("<td>").addClass("delete-btn").text("X");

    projectRow.append(projectNameCell, projectTypeCell, hourlyRateCell, projectDateCell, projectDueDateCell, totalEarningsCell, projectDeleteCell);
    $("#table").append(projectRow);
    handleCloseModal();
}

// calculates the total earnings
function calculateTotalEarnings(rate, date) {
    const daysLeft = moment(date).diff(moment(), "days");
    return rate * daysLeft * 24;
}

// handles deletion of rows
function handleRowDelete(event) {
    $(event.target).parent("tr").remove();
}

// closes the modal
function handleCloseModal() {
    $("#project").modal("hide");
}

// handles the form submittal
function handleFormSubmit(event) {
    event.preventDefault();

    // get form info
    const projectName = $("#projectName").val();
    const projectType = $("#projectType").val();
    const hourlyRate = $("#hourlyRate").val();
    const projectDate = $("#projectDate").val();

    // append info to table
    printProjectTable(projectName, projectType, hourlyRate, projectDate);
}

// user clicks submit button
$("#projectForm").on("submit", handleFormSubmit);

// user clicks "X" on row to delete it
$("#projectBody").on("click", ".delete-btn", handleRowDelete);

// handles closing modal
$(".js-close").on("click", handleCloseModal);
