import React from "react";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioElse: {
        portfolio: "",
        else: ""
      },
      touched: {
        portfolio: false
      }
    };
  }

  componentDidMount() {
    const data = this.props.currentData;
    Object.values(data).length !== 0 && this.setState({ portfolioElse: data });
  }

  handleChange = (e, field) => {
    let portfolioElse = { ...this.state.portFolioElse };
    portfolioElse[field] = e.target.value;
    this.setState({ portfolioElse });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Thank you for answering!");
  };

  handleClick = () => {
    this.props.history.push("/lets-talk-react/skills");
  };

  handleSave = () => {
    this.props.portfolios(this.state.portfolioElse, this.props.section);
  };
  validate = portfolio => {
    const regexPortfolio = /^(https?:\/\/)?[\w-]+(\.\w{2,3}){1,2}(\/[\w-]+)+$/;
    const errors = {
      portfolio: regexPortfolio.test(portfolio)
        ? ""
        : "Please enter correct link"
    };
    return errors;
  };

  isSubmitDisabled = errors => !Object.values(errors).every(err => !err);

  handleBlur = (e, field) => {
    console.log(`${field} is touched`);
    let touched = [...this.state.touched];
    touched[field] = true;
    this.setState({ touched });
  };

  render() {
    const portfolioElse = this.state.portfolioElse;
    const { portfolio } = portfolioElse;
    const errors = this.validate(portfolio);

    const checkValid = field => {
      if (!this.state.touched[field]) {
        return true;
      } else {
        console.log(errors[field]);
        return errors[field] ? false : true;
      }
    };

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <h4>
          Prove you're IBM's next great designer by sowing us wo you are. What
          you've done. How you think. Tell us your story.
        </h4>

        <input
          id="portfolio"
          type="text"
          name="portfolio"
          placeholder="Portfolio link*"
          className={checkValid("portfolio") ? "valid" : "invalid"}
          onBlur={e => this.handleBlur(e, "portfolio")}
          value={portfolioElse["portfolio"]}
          onChange={e => this.handleChange(e, "portfolio")}
        />
        <br />

        <textarea
          id="else"
          style={{ height: 200, width: "100%" }}
          name="else"
          onChange={e => this.handleChange(e, "else")}
          placeholder="Anything else (another link, availability, etc.)?"
        />

        <div className="footer-btn">
          <button onClick={() => this.handleClick("back")}>Back</button>
          <button className="save-btn" onClick={this.handleSave}>
            Save
          </button>
        </div>

        <input
          id="submit"
          type="submit"
          value="Submit"
          disabled={this.isSubmitDisabled(errors)}
        />
      </form>
    );
  }
}

export default Portfolio;
