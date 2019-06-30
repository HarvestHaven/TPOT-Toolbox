import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

import { storiesOf } from '@storybook/react';
import { action as actionSB} from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { MobX } from './MobX';

@observer
class Kittens extends Component {
    @observable cat = false

    @action.bound toggle() {
        this.cat = !this.cat
    }

    render() {
        return (
            <button onClick={this.toggle}>{this.cat.toString()}</button>
        )
    }
}

const task = {
    name: 'MobXz'
}

const actions = {
    test: 'good1',
    test2: 'good2'
}

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
    .add('Kittens', ()=> <Kittens />)
    .add('MobX', ()=> <MobX />)
    .add('MobXdefault', () => <MobX task={task} />)
    .add('MobXpinned', () => <MobX task={{ ...task, state: 'pinned' }} />)
  .add('with text', () => <Button onClick={actionSB('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));