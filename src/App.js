/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState, useEffect } from "react";
import {
  GlobalStyleSheet,
  UniversalHeader,
  Heading,
  Margins,
  SPACING,
  icons,
  Icon,
  COLORS,
  TYPOGRAPHY,
  Loading,
  Text,
  Link
} from "@umich-lib/core";

const { GoogleSpreadsheet } = require("google-spreadsheet");

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    if (!data) {
      const doc = new GoogleSpreadsheet(
        "1OAGlyvSjzCeaP-rc_3R2q1oSt953tHXFyN7S1GN4QcQ"
      );
      doc.useApiKey("AIzaSyD8EKYBYNuefzFxG6PiedIInnDQROSjZdw"); // only for read-only access to public sheets

      async function fetchData() {
        await doc.loadInfo();
        const sheet = doc.sheetsById[0];
        const rows = await sheet.getRows();
        setData(
          rows.map(row => {
            return {
              icon: row.icon,
              label: row.label
            };
          })
        );
      }

      fetchData();
    }
  }, [data]);

  return (
    <React.Fragment>
      <GlobalStyleSheet />
      <UniversalHeader />

      <Margins>
        <main
          css={{
            maxWidth: "38rem",
            marginTop: SPACING["L"],
            "> *": {
              marginBottom: SPACING["M"]
            }
          }}
        >
          <Heading level={1} size="3XL">
            Library Search format label to icon mappings
          </Heading>

          <Text lede>
            This site pulls data from the{" "}
            <Link to="https://docs.google.com/spreadsheets/d/1OAGlyvSjzCeaP-rc_3R2q1oSt953tHXFyN7S1GN4QcQ/edit#gid=0">
              Format label to icon specifications | Library Search (Google
              Sheet)
            </Link>{" "}
            and uses{" "}
            <Link to="https://design-system.lib.umich.edu/guides/iconography/library">
              Icononography from the Design System
            </Link>
            . Updates to the spec can be seen here with a page refresh.
          </Text>

          {!data && (
            <div
              css={{
                display: "inline-block",
                padding: `${SPACING["XL"]} 0`
              }}
            >
              <Loading />
              <p>Loading...</p>
            </div>
          )}

          {data && (
            <table
              css={{
                width: "100%",
                th: {
                  textAlign: "left",
                  borderBottom: `solid 2px ${COLORS.maize[400]}`,
                  ...TYPOGRAPHY["3XS"]
                },
                "th, td": {
                  padding: SPACING["M"],
                  paddingLeft: "0"
                },
                td: {
                  borderBottom: `solid 1px ${COLORS.neutral[100]}`
                }
              }}
            >
              <thead>
                <tr>
                  <th>Label</th>
                  <th colSpan="2">Icon</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ icon, label }) => (
                  <tr>
                    <td>{label}</td>
                    <td>{icons[icon] && <Icon icon={icon} />}</td>
                    <td>{icon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </Margins>
    </React.Fragment>
  );
}

export default App;
