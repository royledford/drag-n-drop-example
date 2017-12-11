import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import './vendor/normalize.css'
import './vendor/reset.css'
import './styles/vars.css'
import './styles/base.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
