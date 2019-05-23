import axios from 'axios';
import React, {
  Component,
  ChangeEvent,
  FormEvent,
} from 'react';

import Header from '../header/Header';
import styles from './AddTask.module.scss';

type AddJobState = {
  formSubmitted: boolean;
  phrase: string;
};

class AddJob extends Component<any, AddJobState> {
  state: AddJobState = {
    formSubmitted: false,
    phrase: '',
  };

  render() {
    const {
      formSubmitted,
      phrase,
    } = this.state;

    return (
      <>
        <Header />
        <div className="container">
          <div className={styles.content}>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phrase"
                  value={phrase}
                  onChange={this.onChangePhrase}
                />
              </div>
              <button
                type="submit"
                disabled={formSubmitted}
                className="btn btn-primary d-block ml-auto"
              >
                Start job
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  onChangePhrase = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      phrase: e.target.value,
    });
  }

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      phrase,
    } = this.state;

    try {
      this.setState({
        formSubmitted: true,
      });

      await axios.get(`/crawler/${phrase}`);

      this.setState({
        formSubmitted: false,
        phrase: '',
      });
    } catch (error) {
      console.log(error);

      this.setState({
        formSubmitted: false,
      });
    }
  }
}

export default AddJob;