import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { useWeb3Context } from "../../hooks";
import { Paper, Grid, Typography, Box, Zoom, Container, useMediaQuery } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import imgStakeButton from '../../assets/images/img_stake_btn.png';
import imgUnStakeButton from '../../assets/images/img_unstake_btn.png';
import imgCliamButton from '../../assets/images/img_claim_btn.png';
import imgApproveButton from '../../assets/images/img_approve_btn.png';
import { trim, formatCurrency } from "../../helpers";
import { mintNFTWithBNB } from "../../slices/NFT";

import { useTheme } from "@material-ui/core/styles";
import "./stake.scss";

function Stake() {
  const [data, setData] = useState(null);
  const [apy, setApy] = useState(null);
  const [runway, setRunway] = useState(null);
  // const [staked, setStaked] = useState(null);
  const theme = useTheme();
  const smallerScreen = useMediaQuery("(max-width: 650px)");
  const verySmallScreen = useMediaQuery("(max-width: 379px)");
  const dispatch = useDispatch();
  const { connect, address, provider, chainID, connected, hasCachedProvider } = useWeb3Context();
  const staked = useSelector(state => {
    return state.app.Staked;
  });

  const nftList = [
    {
      url: "images/nft/nft_item_1.gif",
      name: 'Valkyrie M81',
      rarity: 'Legendary',
      stakingMultiplier: 'x3',
      dropChance: '5%'
    },
    {
      url: "images/nft/nft_item_2.gif",
      name: 'Mauler',
      rarity: 'Super Rare',
      stakingMultiplier: 'X2',
      dropChance: '7%'
    },
    {
      url: "images/nft/nft_item_3.gif",
      name: 'Cyanide',
      rarity: 'Rare',
      stakingMultiplier: 'X1.75',
      dropChance: '8%'
    },
    {
      url: "images/nft/nft_item_4.gif",
      name: 'Hussar',
      rarity: 'Epic',
      stakingMultiplier: 'X1.5',
      dropChance: '10%'
    },
    {
      url: "images/nft/nft_item_5.gif",
      name: 'Mordred',
      rarity: 'Supreme',
      stakingMultiplier: 'X1.25',
      dropChance: '30%'
    },
    {
      url: "images/nft/nft_item_6.gif",
      name: 'Ardor',
      rarity: 'Common',
      stakingMultiplier: 'X1',
      dropChance: '40%'
    },
  ];
  const stakingAPY = useSelector(state => {
    return state.app.stakingAPY
  })

  useEffect(() => {
  }, []);


  const onMintwithBNB = async action => {
    await dispatch(mintNFTWithBNB({ provider, address, networkID: chainID }));
  };

  return (
    <div id="stake-view" className={`${smallerScreen && "smaller"} ${verySmallScreen && "very-small"}`}>
      <Container
        style={{
          paddingLeft: smallerScreen || verySmallScreen ? "0" : "2.3rem",
          paddingRight: smallerScreen || verySmallScreen ? "0" : "2.3rem",
        }}
      >
        <Zoom in={true}>
          <Paper className="ohm-card">
            <Grid container spacing={2} className="data-grid" alignContent="center">
              <Grid item lg={2} md={2} sm={1} xs={0} />
              <Grid item lg={8} md={8} sm={10} xs={12}>
                <div className="buy-pannel">
                  <Typography variant="h4" className="title1" align={'center'}>
                    Token Staked Info
                  </Typography>
                  <Grid container className="data-grid" alignContent="center">
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h6" className="nft-item-description-title" align={'left'}>
                        Token ID :
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h6" className="nft-item-description-value" align={'right'}>
                        {"1"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className="data-grid" alignContent="center">
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h6" className="nft-item-description-title" align={'left'}>
                        Reward Token Amount :
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h6" className="nft-item-description-value" align={'right'}>
                        {"1000"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className="data-grid" alignContent="center">
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h6" className="nft-item-description-title" align={'left'}>
                        Pending Token Amount :
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="h6" className="nft-item-description-value" align={'right'}>
                        {"1000"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <div className="button-group">
                    <Grid container spacing={2} className="data-grid" alignContent="center">
                      <Grid item lg={1} md={1} sm={1} xs={1} />
                      <Grid item lg={5} md={5} sm={5} xs={5} >
                        <img src={imgStakeButton} className="left-button"/>
                      </Grid>
                      <Grid item lg={5} md={5} sm={5} xs={5} >
                        <img src={imgCliamButton} className="right-button"/>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
              <Grid item lg={2} md={2} sm={1} xs={0} />
            </Grid>
            <div className="nft-list-pannel">
              <Grid container spacing={2} className="data-grid" alignContent="center">
                <Grid item lg={1} md={1} sm={0} xs={0} />
                <Grid item lg={10} md={10} sm={12} xs={12} >
                  <Grid container spacing={2} className="data-grid" alignContent="center">
                    < Grid item lg={4} md={4} sm={3} xs={3} />
                    < Grid item lg={4} md={4} sm={6} xs={6} >
                      <div className="nft-item">
                        <img src={"images/nft/nft_item_6.gif"} className="nft-list-item-image" />
                        <Grid container className="data-grid" alignContent="center">
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant="h6" className="nft-item-description-title" align={'left'}>
                              Name :
                            </Typography>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant="h6" className="nft-item-description-value" align={'right'}>
                              {"Speed"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container className="data-grid" alignContent="center">
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant="h6" className="nft-item-description-title" align={'left'}>
                              Rarity :
                            </Typography>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant="h6" className="nft-item-description-value" align={'right'}>
                              {"100"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container className="data-grid" alignContent="center">
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant="h6" className="nft-item-description-title" align={'left'}>
                              Staking Multiplier :
                            </Typography>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant="h6" className="nft-item-description-value" align={'right'}>
                              {"x1.25"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container className="data-grid" alignContent="center">
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant="h6" className="nft-item-description-title" align={'left'}>
                              Drop Chance :
                            </Typography>
                          </Grid>
                          <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography variant="h6" className="nft-item-description-value" align={'right'}>
                              {"10"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    < Grid item lg={4} md={4} sm={3} xs={3} />
                  </Grid>
                </Grid>
                <Grid item lg={1} md={1} sm={0} xs={0} />
              </Grid>
            </div>
          </Paper>
        </Zoom>
      </Container >
    </div >
  );
}

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <Stake />
  </QueryClientProvider>
);