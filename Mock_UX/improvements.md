# improvements made in this second iteration of the test:

- introduced Lazy loading: the EmployeeDetails component does not need to be executed immediately , it is only needed when a user clicks on a row to see the employee details

- added an ErrorBoundary, and changed api calls to throw rather than return an error if something goes wrong.
That way if an unknow error occures in the ux, the error is handleded, with an easy to read message for the user, rather than a blank screen.

- wrapped the sortingFilters component in use memo, so that if props don't change from one render to the next, it will skip re-rendering the component

- added key to Employee details mapping, as that was causing error messages to appear in the console

- added useCallback and Memo to take care of  the Sorting handler  (no need to re render the sorting filters components, if the props relevant to that don't change)

- added useMemo for computing paginated data. Unless a user changes the number of rows per page , or the page, or the rows, recomputing paginated data is not necessary.

- added use memo for filtered data. The variable filteredData is not a state variable any more, but rather a memoised variable. the Apply filter handler logic is handled in there, along with the useEffect hook that runs when the name filter changes.
