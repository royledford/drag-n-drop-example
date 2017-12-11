# Drag and Drop Example

This is an example of using HTML5 drag and drop in a React app.

I worked on a project with a requirement to provide a list that allowed the user to drag each item on the screen to create a custom sort order.

I wanted to understand the various ways of handling drag and drop in both HTML and in React and decided to create a demo of using two different ways of handling the requirement.

It contains an implementation using the basic HTML5 drap and drop API and the react-dnd library.

You can view the demo at [https://royledford.github.io/drag-n-drop-example]([https://royledford.github.io/drag-n-drop-example]). Click the _HTML5 DnD_ or _React DnD_ button to view the examples.

Both lists are using the same state, so dragging in one version will update both versions.

## HTML5 Drag and Drop

[Daniel Stocks](http://webcloud.se/) has a good [tutorial](http://webcloud.se/sortable-list-component-react-js/) on building a React based component. The _HTML5 DnD_ example in this project is based on his tutorial.

## React-DnD

[Dan Abramov](https://github.com/gaearon) has an [awesome article](https://medium.com/@dan_abramov/the-future-of-drag-and-drop-apis-249dfea7a15f) on Medium discussing some of the drawbacks to the HTML5 drag and drop API. He also authored [react-dnd](http://react-dnd.github.io/react-dnd/) to help overcome the drawbacks and provide a better API and user experience.

The _React DnD_ in this example uses react-dnd.

## Running the demo locally

The demo is built using create-react-app.

Clone the rep

```bash
git clone https://github.com/royledford/drag-n-drop-example.git
```

Change to the new folder and install the dependencies

```bash
cd drag-n-drop-example
yarn install
```

Start the app

```bash
yarn start
```
