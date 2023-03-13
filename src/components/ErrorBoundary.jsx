import React from "react";

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    errorMessage: "",
    infoComponent: {
      componentStack: "",
    },
  };

  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true,
      errorMessage: error.message,
      infoComponent: info,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.title}>Oops! Algo salió mal.</h1>
          <p style={styles.description}>{this.state.errorMessage}</p>
          <div style={styles.stack}>
            {this.state.infoComponent.componentStack
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>
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
  stack: {
    width: "50%",
    minWidth: "300px",
    maxHeight: "500px",
    overflowX: "scroll",
    border: "1px solid red",
  },
};
