import { useState } from "react";
import "./App.css";

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const initialDonors = [
  {
    id: 1,
    name: "Ananya",
    bloodGroup: "O+",
    location: "Chengannur",
  },
  {
    id: 2,
    name: "Arjun",
    bloodGroup: "A+",
    location: "Thiruvalla",
  },
  {
    id: 3,
    name: "Meera",
    bloodGroup: "B+",
    location: "Mavelikara",
  },
  {
    id: 4,
    name: "Rahul",
    bloodGroup: "O-",
    location: "Chengannur",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [donors, setDonors] = useState(initialDonors);

  const [selectedBlood, setSelectedBlood] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const [donorForm, setDonorForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    location: "",
    age: "",
  });

  const [receiverForm, setReceiverForm] = useState({
    name: "",
    bloodGroup: "",
    location: "",
    units: "1",
    urgency: "Normal",
  });

  const filteredDonors = donors.filter((donor) => {
    const bloodMatch =
      !selectedBlood || donor.bloodGroup === selectedBlood;

    const locationMatch =
      !searchLocation ||
      donor.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());

    return bloodMatch && locationMatch;
  });

  const showMessage = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3500);
  };

  const goHome = () => {
    setPage("home");
    window.scrollTo(0, 0);
  };

  const goDonor = () => {
    setPage("donor");
    window.scrollTo(0, 0);
  };

  const goReceiver = () => {
    setPage("receiver");
    window.scrollTo(0, 0);
  };

  const goSearch = () => {
    setPage("search");
    window.scrollTo(0, 0);
  };

  const handleDonorChange = (event) => {
    setDonorForm({
      ...donorForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleReceiverChange = (event) => {
    setReceiverForm({
      ...receiverForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleDonorSubmit = (event) => {
    event.preventDefault();

    const newDonor = {
      id: Date.now(),
      name: donorForm.name,
      bloodGroup: donorForm.bloodGroup,
      location: donorForm.location,
    };

    setDonors([...donors, newDonor]);

    setDonorForm({
      name: "",
      bloodGroup: "",
      phone: "",
      location: "",
      age: "",
    });

    showMessage();
  };

  const handleReceiverSubmit = (event) => {
    event.preventDefault();

    showMessage();

    setReceiverForm({
      name: "",
      bloodGroup: "",
      location: "",
      units: "1",
      urgency: "Normal",
    });
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">

          <button className="logo" onClick={goHome}>
            <span className="logo-drop">♥</span>

            <span>
              <strong>Life</strong>Drop
            </span>
          </button>

          <nav className="nav-links">

            <button
              className={page === "home" ? "active" : ""}
              onClick={goHome}
            >
              Home
            </button>

            <button
              className={page === "donor" ? "active" : ""}
              onClick={goDonor}
            >
              Donor
            </button>

            <button
              className={page === "receiver" ? "active" : ""}
              onClick={goReceiver}
            >
              Receiver
            </button>

            <button
              className={page === "search" ? "active" : ""}
              onClick={goSearch}
            >
              Find Blood
            </button>

          </nav>

          <button
            className="nav-button"
            onClick={goDonor}
          >
            Become a Donor
          </button>

        </div>
      </header>

      {/* SUCCESS MESSAGE */}

      {showSuccess && (
        <div className="success-message">
          <span>✓</span>
          Request submitted successfully!
        </div>
      )}

      {/* ================= HOME ================= */}

      {page === "home" && (
        <main>

          {/* HERO */}

          <section className="hero">

            <div className="hero-container">

              <div className="hero-content">

                <div className="small-label">
                  <span className="pulse-dot"></span>
                  EVERY DONATION SAVES A LIFE
                </div>

                <h1>
                  Give Blood.
                  <br />
                  <span>Give Hope.</span>
                </h1>

                <p>
                  LifeDrop connects blood donors with people
                  who urgently need blood. Find a donor or
                  register yourself as a lifesaving donor.
                </p>

                <div className="hero-buttons">

                  <button
                    className="primary-button"
                    onClick={goDonor}
                  >
                    🩸 Become a Donor
                  </button>

                  <button
                    className="secondary-button"
                    onClick={goReceiver}
                  >
                    Find Blood →
                  </button>

                </div>

                <div className="hero-stats">

                  <div>
                    <strong>{donors.length}+</strong>
                    <span>Registered Donors</span>
                  </div>

                  <div>
                    <strong>8</strong>
                    <span>Blood Groups</span>
                  </div>

                  <div>
                    <strong>24/7</strong>
                    <span>Emergency Support</span>
                  </div>

                </div>

              </div>

              {/* HERO GRAPHIC */}

              <div className="hero-visual">

                <div className="blood-circle">

                  <div className="blood-drop">
                    ♥
                  </div>

                </div>

                <div className="floating-card card-one">

                  <span className="card-icon">
                    🩸
                  </span>

                  <div>
                    <strong>Blood Needed</strong>
                    <small>Every 2 seconds</small>
                  </div>

                </div>

                <div className="floating-card card-two">

                  <span className="check-icon">
                    ✓
                  </span>

                  <div>
                    <strong>Lives Saved</strong>
                    <small>One donation can help</small>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* BLOOD GROUP SEARCH */}

          <section className="blood-section">

            <div className="section-heading">

              <div>

                <span className="section-label">
                  QUICK SEARCH
                </span>

                <h2>
                  Find the blood you need
                </h2>

              </div>

              <button
                className="text-button"
                onClick={goSearch}
              >
                Search all donors →
              </button>

            </div>

            <div className="blood-grid">

              {bloodGroups.map((group) => {

                const count = donors.filter(
                  (donor) =>
                    donor.bloodGroup === group
                ).length;

                return (
                  <button
                    key={group}
                    className="blood-card"
                    onClick={() => {
                      setSelectedBlood(group);
                      goSearch();
                    }}
                  >

                    <span className="blood-symbol">
                      +
                    </span>

                    <strong>{group}</strong>

                    <small>
                      {count} donor{count !== 1 ? "s" : ""}
                    </small>

                  </button>
                );

              })}

            </div>

          </section>

          {/* HOW IT WORKS */}

          <section className="how-section">

            <div className="center-heading">

              <span className="section-label">
                HOW IT WORKS
              </span>

              <h2>
                Making blood access easier
              </h2>

              <p>
                LifeDrop makes it simple to connect donors
                and receivers when every second matters.
              </p>

            </div>

            <div className="steps">

              <div className="step">

                <div className="step-number">
                  01
                </div>

                <div className="step-icon">
                  👤
                </div>

                <h3>
                  Register
                </h3>

                <p>
                  Donors can create a profile with their
                  blood group and location.
                </p>

              </div>

              <div className="step">

                <div className="step-number">
                  02
                </div>

                <div className="step-icon">
                  🔎
                </div>

                <h3>
                  Search
                </h3>

                <p>
                  Receivers can search for compatible
                  donors nearby.
                </p>

              </div>

              <div className="step">

                <div className="step-number">
                  03
                </div>

                <div className="step-icon">
                  ❤️
                </div>

                <h3>
                  Connect
                </h3>

                <p>
                  Contact the available donor and
                  coordinate the donation.
                </p>

              </div>

            </div>

          </section>

          {/* CTA */}

          <section className="cta-section">

            <div>

              <span className="section-label light">
                BE A HERO
              </span>

              <h2>
                Someone out there needs your blood.
              </h2>

              <p>
                Your small act of kindness could become
                someone's second chance at life.
              </p>

            </div>

            <button
              className="white-button"
              onClick={goDonor}
            >
              Register as a Donor →
            </button>

          </section>

        </main>
      )}

      {/* ================= DONOR ================= */}

      {page === "donor" && (
        <main className="inner-page">

          <section className="page-header">

            <span className="section-label">
              DONOR
            </span>

            <h1>
              Become a LifeDrop donor
            </h1>

            <p>
              Register yourself as a blood donor and
              help someone when they need it most.
            </p>

          </section>

          <section className="form-section">

            <form
              className="form-card"
              onSubmit={handleDonorSubmit}
            >

              <div className="form-title">

                <div className="form-icon">
                  🩸
                </div>

                <div>

                  <h2>
                    Donor Registration
                  </h2>

                  <p>
                    Enter your details below.
                  </p>

                </div>

              </div>

              <div className="form-grid">

                <div className="input-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={donorForm.name}
                    onChange={handleDonorChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>

                <div className="input-group">

                  <label>
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={donorForm.age}
                    onChange={handleDonorChange}
                    placeholder="Your age"
                    min="18"
                    max="65"
                    required
                  />

                </div>

                <div className="input-group">

                  <label>
                    Blood Group
                  </label>

                  <select
                    name="bloodGroup"
                    value={donorForm.bloodGroup}
                    onChange={handleDonorChange}
                    required
                  >

                    <option value="">
                      Select blood group
                    </option>

                    {bloodGroups.map((group) => (
                      <option
                        key={group}
                        value={group}
                      >
                        {group}
                      </option>
                    ))}

                  </select>

                </div>

                <div className="input-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={donorForm.phone}
                    onChange={handleDonorChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />

                </div>

                <div className="input-group full">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={donorForm.location}
                    onChange={handleDonorChange}
                    placeholder="City / Town"
                    required
                  />

                </div>

              </div>

              <div className="form-note">

                🔒 Your information will be used only for
                connecting you with people who need blood.

              </div>

              <button
                type="submit"
                className="primary-button submit-button"
              >
                Register as Donor →
              </button>

            </form>

          </section>

        </main>
      )}

      {/* ================= RECEIVER ================= */}

      {page === "receiver" && (
        <main className="inner-page">

          <section className="page-header">

            <span className="section-label">
              RECEIVER
            </span>

            <h1>
              Find the blood you need
            </h1>

            <p>
              Submit your blood requirement and find
              matching donors near you.
            </p>

          </section>

          <section className="form-section">

            <form
              className="form-card"
              onSubmit={handleReceiverSubmit}
            >

              <div className="form-title">

                <div className="form-icon">
                  ❤️
                </div>

                <div>

                  <h2>
                    Blood Request
                  </h2>

                  <p>
                    Tell us what you need.
                  </p>

                </div>

              </div>

              <div className="form-grid">

                <div className="input-group">

                  <label>
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={receiverForm.name}
                    onChange={handleReceiverChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>

                <div className="input-group">

                  <label>
                    Required Blood Group
                  </label>

                  <select
                    name="bloodGroup"
                    value={receiverForm.bloodGroup}
                    onChange={handleReceiverChange}
                    required
                  >

                    <option value="">
                      Select blood group
                    </option>

                    {bloodGroups.map((group) => (
                      <option
                        key={group}
                        value={group}
                      >
                        {group}
                      </option>
                    ))}

                  </select>

                </div>

                <div className="input-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={receiverForm.location}
                    onChange={handleReceiverChange}
                    placeholder="Hospital / City"
                    required
                  />

                </div>

                <div className="input-group">

                  <label>
                    Units Required
                  </label>

                  <input
                    type="number"
                    name="units"
                    value={receiverForm.units}
                    onChange={handleReceiverChange}
                    min="1"
                    max="10"
                    required
                  />

                </div>

                <div className="input-group full">

                  <label>
                    Urgency
                  </label>

                  <div className="urgency-options">

                    {[
                      "Normal",
                      "Urgent",
                      "Emergency",
                    ].map((level) => (

                      <label
                        key={level}
                        className={`urgency-option ${
                          receiverForm.urgency === level
                            ? "selected"
                            : ""
                        }`}
                      >

                        <input
                          type="radio"
                          name="urgency"
                          value={level}
                          checked={
                            receiverForm.urgency === level
                          }
                          onChange={handleReceiverChange}
                        />

                        <span>
                          {level}
                        </span>

                      </label>

                    ))}

                  </div>

                </div>

              </div>

              <button
                type="submit"
                className="primary-button submit-button"
              >
                Submit Blood Request →
              </button>

            </form>

          </section>

        </main>
      )}

      {/* ================= SEARCH ================= */}

      {page === "search" && (
        <main className="inner-page">

          <section className="page-header">

            <span className="section-label">
              DONOR SEARCH
            </span>

            <h1>
              Find a blood donor
            </h1>

            <p>
              Search registered donors by blood group
              and location.
            </p>

          </section>

          <section className="search-section">

            <div className="search-box">

              <div className="search-input">

                <label>
                  Blood Group
                </label>

                <select
                  value={selectedBlood}
                  onChange={(event) =>
                    setSelectedBlood(event.target.value)
                  }
                >

                  <option value="">
                    All blood groups
                  </option>

                  {bloodGroups.map((group) => (
                    <option
                      key={group}
                      value={group}
                    >
                      {group}
                    </option>
                  ))}

                </select>

              </div>

              <div className="search-input">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  value={searchLocation}
                  onChange={(event) =>
                    setSearchLocation(event.target.value)
                  }
                  placeholder="Enter city or town"
                />

              </div>

              <button
                className="primary-button search-button"
                type="button"
              >
                🔎 Search
              </button>

            </div>

            <div className="results-heading">

              <h2>
                Available donors
              </h2>

              <span>
                {filteredDonors.length} results
              </span>

            </div>

            {filteredDonors.length === 0 ? (

              <div className="empty-state">

                <div>
                  🩸
                </div>

                <h3>
                  No donors found
                </h3>

                <p>
                  Try another blood group or location.
                </p>

              </div>

            ) : (

              <div className="donor-results">

                {filteredDonors.map((donor) => (

                  <div
                    className="donor-card"
                    key={donor.id}
                  >

                    <div className="donor-avatar">
                      {donor.name.charAt(0)}
                    </div>

                    <div className="donor-info">

                      <h3>
                        {donor.name}
                      </h3>

                      <p>
                        📍 {donor.location}
                      </p>

                    </div>

                    <div className="donor-blood">

                      <span>
                        {donor.bloodGroup}
                      </span>

                      <small>
                        Blood Group
                      </small>

                    </div>

                    <button
                      className="contact-button"
                      type="button"
                      onClick={() =>
                        alert(
                          "Donor contact will be available after backend integration."
                        )
                      }
                    >
                      Contact
                    </button>

                  </div>

                ))}

              </div>

            )}

          </section>

        </main>
      )}

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-container">

          <div>

            <button
              className="footer-logo"
              onClick={goHome}
            >
              <span>♥</span> LifeDrop
            </button>

            <p>
              Connecting blood donors with people who need them.
            </p>

          </div>

          <div className="footer-links">

            <button onClick={goHome}>
              Home
            </button>

            <button onClick={goDonor}>
              Donor
            </button>

            <button onClick={goReceiver}>
              Receiver
            </button>

            <button onClick={goSearch}>
              Find Blood
            </button>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 LifeDrop. Built to save lives.

        </div>

      </footer>

    </div>
  );
}

export default App;