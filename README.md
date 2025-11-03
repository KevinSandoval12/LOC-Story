# when finished use the checkbox!!!

## User Story #1: View Summary Table

As a member of the Learning Outcomes Committee (LOC), I can view a summary table/grid for the current year containing all of the project information, so that I can view details at a glance.

### Acceptance Criteria #1 – Display Summary Table

- [x] Given I am on the LOC Summary page
- [x] When the page loads
- [x] Then I should see a data grid with the following columns:
  - Division
  - Academic Program
  - Division Chair
  - Dean
  - LOC Rep
  - PEN Contact
  - Payee(s)
  - Has Been Paid (Yes/No)
  - Report Submitted (Yes/No)
  - Notes
- [x] And I should be able to scroll horizontally and vertically through the table if the data exceeds the viewable area.

### Acceptance Criteria #2 – Sorting

- [x] Given I am on the summary table
- [x] When I click on a column header
- [x] Then the table should sort data ascending or descending by that column.
- [x] And the active sort column and direction should be visually indicated (e.g., arrow icon).

### Acceptance Criteria #3 – Search/Filter

- [x] Given I am viewing the summary table
- [x] When I enter a keyword (such as a Division, Program Name, or Payee) in the search bar
- [x] Then the table should display only rows containing matching results.
- [x] And clearing the search field should restore the full table.

### Technical Tasks

- [x] Create a new route or page component for “LOC Summary.”
- [x] Build a responsive data table using a JavaScript framework or library (e.g., DataTables.js, React Table, or plain JS).
- [x] Implement sorting and search functionality using client-side filtering.
- [x] Ensure accessibility compliance (keyboard navigation, readable column headers).
- [ ] Validate and test across major browsers and devices.
- [ ] Commit changes to GitHub with clear messages referencing Sprint 2.

---

## User Story #2: Update Program Information

As a member of the LOC, I can update program information (Academic Program, Payee(s), Has Been Paid, Report Submitted, and Notes), and assign a Division to each program so that I can keep information current.

### Acceptance Criteria #1 – Edit Program Information

- [x] Given I am viewing the summary table
- [x] When I click on an “Edit” button for a program
- [x] Then I should see an editable form or inline fields for:
  - Academic Program (cannot be blank)
  - Payee(s)
  - Has Been Paid
  - Report Submitted
  - Notes
  - Division (select dropdown)
- [x] And the fields should be pre-populated with existing data.

### Acceptance Criteria #2 – Input Validation

- [x] Given I am editing a program record
- [x] When I leave the Academic Program field blank
- [x] Then I should see an inline validation message: “Academic Program cannot be blank.”
- [x] And I cannot save until all required fields are filled.
- [x] And validation messages disappear once corrected.

### Acceptance Criteria #3 – Save and Cancel

- [x] Given I have made changes to a program record
- [x] When I click “Save”
- [x] Then I will see a confirmation message, "Changes saved!"
- [x] And a current timestamp will be captured
- [x] And my data will be saved to an in-memory array
- [x] And the array will be printed to the console
- [x] When I click “Cancel”
- [x] Then all unsaved changes are discarded and the summary reverts to its previous state.

### Technical Tasks

- [x] Make an editable table or form
- [x] Add “Edit” and “Save” buttons
- [x] Add input validation rules and messages
- [x] Implement “Save” functionality (data is not actually saved at this point)
- [x] Implement “Cancel” to close the form or editable fields
- [x] Ensure data integrity (e.g., Academic Program cannot be null)
- [x] Add loading or success indicators for save operations
- [x] Test for usability, error handling, and data persistence
- [x] Push all updates to GitHub with detailed commit notes

---

## User Story #3: Navigation Between Forms

As a member of the LOC, I can link to the summary page from the Division form (created in Sprint 1), and from the Division form to the summary page.

### Acceptance Criteria #1 – Navigation from Division Form to Summary Page

- [x] Given I am on the Division management form (from Sprint 1)
- [x] When I click a “View Summary” button or link
- [x] Then I should be navigated to the LOC Summary page
- [ ] And I should see the summary table for the current year

### Acceptance Criteria #2 – Navigation from Summary Page to Division Form

- [x] Given I am viewing the LOC Summary page
- [x] When I click on a Division name or an associated “Edit Division” link
- [x] Then I should be navigated to the Division management form

### Technical Tasks

- [x] Add a “View Summary” link or button to the Division management form.
- [x] Add a “Return to Division Form” or clickable Division link on the Summary page.
- [x] Implement routing or navigation logic between pages.
- [x] Test navigation in both directions for accuracy and user flow.

---

## Definition of Done

- [ ] All code is well-formatted, commented, and validated.
- [ ] The web app is user-friendly, accessible, and responsive.
- [ ] Code is version-controlled on GitHub with regular, descriptive commits.
- [ ] Proper error handling and input validation are implemented.
- [ ] All pages use consistent styling and naming conventions.

---

## Deliverables

- Submit the URL of your web app on Digital Ocean (one submission per team).
- Provide a link to your GitHub repository showing Sprint 2 updates.
