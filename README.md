# Currency Calculator

## Setup

1. Clone the repo
2. `pnpm install`
3. (Optional) Add your API key to `.env` file
4. `pnpm run dev`

## Notes

Built in slightly over 2 hours. If I had more time I'd refactor to

- Abstract the state interactions into Context (avoid prop drilling)
- Use a reducer to make the dipatching of UI interactions easier to read in the code.
- Sort out the UI so that it doesn't 'jump' when it is fetching data. Partial solution would be to utilise a debounce function to delay state updates from the user changing the inputs.
- Write some UI tests in Cypress.io

## Additional Features

- Tanstack Query used to wrap the API fetch requests. The main advantage here is to reduce the number of API calls. It caches the results of any calls and uses the `convertQuery` queryKey to lookup the results. We could also utilise things like `isLoading` and catch api errors better.
