# Real-Time Road Incident Tracking and Reporting with Angular using MapLibre GL JS map  

Front-end application developed using Angular, focused on managing and visualizing real-time events, particularly related to road incidents. Users can add and view events on a map, where each event is represented by tags displaying specific details. The application allows users to contribute by adding their own events and provides a feature to report incidents or noteworthy occurrences. 

Overall, it provides a user-friendly interface for interacting with and staying informed about events, particularly those related to road incidents.

## Screenshot

![app login interface](/assets/capture1)
![app signin interface](/assets/capture2)
![app homescreen interface](/assets/capture3)
![app add event interface](/assets/capture4)


## Build With

* [Angular](https://angular.io/)
* [MapLibre GL JS](https://maplibre.org/)
* [MapTiler](https://www.maptiler.com/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* Angular CLI
  ```sh
  npm install -g @angular/cli
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Create an app

Clone the repo to create a new angular project. Run in your command-line:

```
  git clone https://github.com/anis-nouri/soc_proj_front
```

Navigate to the newly created project folder **my-angular-map**

Install the NPM packages dependencies. Run in your command-line:

```
  npm install
```

### API KEY

Navigate to the `src/environments` folder

Open the `environment.ts` and `environment.prod.ts` file, :warning: you will need to replace **YOUR_MAPTILER_API_KEY** with your own MapTiler API key.

Your MapTiler account access key is on your MapTiler [Cloud](https://cloud.maptiler.com/account/keys/) account page. 

:information_source: If you don't have an API KEY, you can create it for free at https://www.maptiler.com/cloud/

### Run

To start your local environment, run: 

```
  ng serve --open
``` 

You will find your app on address http://localhost:4200/.

Now you should see the app in your browser.

<p align="right">(<a href="#top">back to top</a>)</p>
