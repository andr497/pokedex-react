import React from "react";

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    errorMessage: "",
  };

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error.message });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.title}>Oops! Algo salió mal.</h1>
          <p style={styles.description}>{this.state.errorMessage}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#ff5a5f",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.5rem",
    color: "#333",
  },
};
