import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import NewsCard, { INewsCard } from "@/pages/components_test/NewsCard/NewsCard";
import { listNewsCard } from "../../data_test/mockNewsCard";

import { FixedSizeList } from "react-window";

interface NewsCardContainerProps {
  data?: INewsCard[];
  isVertScroll: boolean;
}

const NewsCardContainer: React.FC = ({
  isVertScroll,
}: NewsCardContainerProps) => {
  let flexDirectionBox = isVertScroll ? "column" : "row";
  let overflowYBox = isVertScroll ? "scroll" : "hidden";
  let overflowXBox = isVertScroll ? "hidden" : "scroll";

  return (
    <React.Fragment>
      <Container fixed>
        <Box
          sx={{
            height: `${50}vh`,
            width: `${47}vh`,
            mb: 2,
            display: "flex",
            flexDirection: `${flexDirectionBox}`,
            overflow: "hidden",
            overflowX: `${overflowXBox}`,
            overflowY: `${overflowYBox}`,
          }}
        >
          {listNewsCard?.map((newsCard) => {
            return (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <NewsCard key={newsCard.id} newsCard={newsCard} />
                </Box>
              </>
            );
          })}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default NewsCardContainer;
