import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../../utils/contextApi/AppContext";
import styles from "../css/index.module.css";
import GoogleMapReact from "google-map-react";
import Loading from "../../../utils/components/Loading";

export default function Profile() {
  const { currentAccount } = useContext(AppContext);
  const [mapLoading, setMapLoading] = useState(true);

  const { id, name, company, profilepicture, address, ...userprofile } =
    currentAccount || {};

  const defaultProps = {
    center: {
      lat: parseFloat(address?.geo?.lat),
      lng: parseFloat(address?.geo?.lng),
    },
    zoom: 11,
  };

  const handleMapLoad = () => {
    setMapLoading(false);
  };

  if (!currentAccount) {
    return <Navigate to={"/login"} />;
  } else if (currentAccount) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.userDetiles}>
            <div className={styles.userprofile}>
              <div className={styles.profileImage}>
                <img src={profilepicture} alt="Profile" />
              </div>
              <p className={styles.username}>{name}</p>
              {Object.entries(userprofile).map(([key, value]) => (
                <div key={key} className={styles.Usercontent}>
                  <label>{key === "email" ? "e-mail" : key} :</label>
                  <p>{key === "phone" ? value.split(" ")[0] : value}</p>
                </div>
              ))}
            </div>
            <div className={styles.userCompnay}>
              <header>Company</header>
              {Object.entries(company).map(([key, value]) => (
                <div key={key} className={styles.Usercontent}>
                  <label>{key} :</label>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.userAddress}>
            <div className={styles.address}>
              <header>Address :</header>
              {Object.entries(address).map(([key, value]) => {
                return (
                  typeof value === "string" && (
                    <div key={key} className={styles.Usercontent}>
                      <label>{key} :</label>
                      <p>{value}</p>
                    </div>
                  )
                );
              })}
              <div className={styles.location}>
                {mapLoading && (
                  <div style={{ position: "absolute" }}>
                    <Loading />
                  </div>
                )}
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    position: "relative",
                  }}
                >
                  <div
                    className={styles.infoText}
                    onClick={(e) => (e.target.style.display = "none")}
                  >
                    while getting the api key it was asking for billing and
                    credit card detailes so i skipped <br /> --msg from
                    jashwanth
                  </div>
                  {/* while getting the api key it was asking for billing and credit card detailes so i skipped */}
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyArl9ejiBZLYUgiblSTvjjjm8ZcKaK1y5Q",
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    defaultCenter={defaultProps?.center}
                    defaultZoom={defaultProps?.zoom}
                    onGoogleApiLoaded={({ map, maps }) => {
                      handleMapLoad();
                      // You can perform additional actions here with the map and maps objects
                    }}
                  ></GoogleMapReact>
                </div>
              </div>
              <div className={styles.cordinatesText}>
                <div>
                  <label>{"lat :"}</label>
                  <p>{address.geo.lat}</p>
                </div>
                <div>
                  <label>{"lng :"}</label>
                  <p>{address.geo.lng}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
