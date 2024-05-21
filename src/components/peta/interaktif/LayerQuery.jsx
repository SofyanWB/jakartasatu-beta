import { Close } from "@mui/icons-material";
import {Box, Button, Grid, IconButton, MenuItem, Modal, Select, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";

const LayerQuery = ({ view, queryOpen, handleCloseQuery, layer, isMobile, setHandleSetQueryTour, tourState }) => {
  const [loading, setLoading] = useState(true);
  const [expressions, setExpressions] = useState([
    {
      "connection": "",
      "field": "",
      "operator": "",
      "possibleValues": "",
      "value": ""
    }
  ]);

  useEffect(() => {
    const fetchLayerExpressions = async () => {
      if (view?.layerViews?.items) {
        const layerView = view.layerViews.items.find(layerView => layerView.layer.id === layer.id);
        if (layerView) {
          const currentExpression = layerView?.filter?.where;
          if (currentExpression) {
            const parts = currentExpression.match(/(?:\w+\s*=\s*'.+?'|\w+|AND|OR|\(|\))/g);
  
            const newParts = [];
            parts.forEach((part, index) => {
              if (index === 0 || index % 2 === 1) {
                newParts.push([part]);
              } else {
                newParts[newParts.length - 1].push(part);
              }
            });
  
            setLoading(false);

            for (let index = 0; index < newParts.length; index++) {
              const part = newParts[index];
              if (index === 0) {
                const result = part[0].split(" ");
                const field = result[0];
                const operator = result[1];
                const value = result.slice(2).join(' ').replace(/'/g, "");

                try {
                  const distinctValuesResponse = await fetch(`${layer.url}/${layer.layerId}/query?where=1%3D1&outFields=${field}&returnGeometry=false&returnDistinctValues=true&f=pjson`)
                  const distinctValuesData = await distinctValuesResponse.json();
                  const distinctValues = distinctValuesData.features.map(feature => feature.attributes[field]);

                  setExpressions([
                    {
                      connection: "",
                      field: field,
                      operator: operator,
                      possibleValues: distinctValues.sort(),
                      value: value
                    }
                  ]);
                } catch (error) {
                  console.error("Error fetching features:", error);
                }
              } else {
                const connection = part[0]
                const result = part[1].split(" ");
                const field = result[0];
                const operator = result[1];
                const value = result.slice(2).join(' ').replace(/'/g, "");

                try {
                  const distinctValuesResponse = await fetch(`${layer.url}/${layer.layerId}/query?where=1%3D1&outFields=${field}&returnGeometry=false&returnDistinctValues=true&f=pjson`)
                  const distinctValuesData = await distinctValuesResponse.json();
                  const distinctValues = distinctValuesData.features.map(feature => feature.attributes[field]);

                  setExpressions(prevExpressions => [
                    ...prevExpressions,
                    {
                      connection: connection,
                      field: field,
                      operator: operator,
                      possibleValues: distinctValues.sort(),
                      value: value
                    }
                  ]);
                } catch (error) {
                  console.error("Error fetching features:", error);
                }
              }
            }
            setLoading(true);
          }
        }
      }
    };
  
    fetchLayerExpressions();
  }, [view?.layerViews?.items, layer]);

  useEffect(() => {
    if(tourState.run) {
      const handleQueryTour = () => {
        setExpressions([
          {
            "connection": "",
            "field": "WADMKD",
            "operator": "=",
            "possibleValues": ["Kelurahan Cideng", "Kelurahan Pondok Kelapa", "Kelurahan Cibubur"],
            "value": "Kelurahan Cideng"
          }
        ])
      };
      setHandleSetQueryTour(handleQueryTour);
    }
  }, [tourState.run]);
  
  const handleConnectionChange = (index, event) => {
    setExpressions((prevstate) => {
      const updatedExpression = [...prevstate];
      updatedExpression[index].connection = event.target.value;
      return updatedExpression;
    })
  };
  
  const handleFieldChange = async (index, event) => {
    try {
      const distinctValuesResponse = await fetch(`${layer.url}/${layer.layerId}/query?where=1%3D1&outFields=${event.target.value}&returnGeometry=false&returnDistinctValues=true&f=pjson`)
      const distinctValuesData = await distinctValuesResponse.json();
      const distinctValues = distinctValuesData.features.map(feature => feature.attributes[event.target.value]);
  
      setExpressions((prevState) => {
        const updatedExpressions = [...prevState];
        updatedExpressions[index].field = event.target.value;
        updatedExpressions[index].possibleValues = distinctValues.sort(); // Sort the distinct values
        return updatedExpressions;
      });
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };
  
  const handleOperatorChange = (index, event) => {
    setExpressions((prevState) => {
      const updatedExpression = [...prevState];
      updatedExpression[index].operator = event.target.value;
      return updatedExpression;
    })
  };

  const handleValueChange = (index, event) => {
    setExpressions((prevState) => {
      const updatedExpression = [...prevState];
      updatedExpression[index].value = event.target.value;
      return updatedExpression;
    })
  };

  const addExpression = () => {
    setExpressions((prevstate) => {
      const newExpression = {
        "connection": "",
        "field": "",
        "operator": "",
        "possibleValues": [],
        "value": "",
      };
      const updatedExpression = [...prevstate, newExpression];
      return updatedExpression;
    })
  };

  const deleteExpression = (index) => {
    setExpressions((prevstate) => {
      const updatedExpression = [...prevstate];
      updatedExpression.splice(index, 1);
      return updatedExpression;
    })
  };

  const resetQuery = () => {
    setExpressions([
      {
        "connection": "",
        "field": "",
        "operator": "",
        "possibleValues": "",
        "value": ""
      }
    ])
  };

  const applyQuery = () => {
    if (view && expressions) {
      view.whenLayerView(layer).then((layerView) => {
        const expressionArray = expressions.reduce((acc, expression, index) => {
          if (index === 0) {
            acc.push(`${expression.field} ${expression.operator} '${expression.value}'`);
          } else {
            acc.push(`${expression.connection} ${expression.field} ${expression.operator} '${expression.value}'`);
          }
          return acc;
        }, []);
        const whereClause = expressionArray.join(" ");
        layerView.filter = {
          where: (expressions[0].field && expressions[0].operator && expressions[0].value) ? whereClause : "",
        };
      });
    }
  };

  const modalStyle = {
    position: "fixed",
    display: "flex",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "40vw" : "90%",
    height: isMobile ? "25vw" : "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: 4,
    color: "black",
  };

  return (
    <>
      {queryOpen && tourState.run ? (
        <Box sx={modalStyle} id={`layer-query-content-${layer.id}`}>
          <Grid container>
            <Grid item xs={12}  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "15%" }}>
              <Typography variant="h6">{`Ekspresi Query - ${layer.title}`}</Typography>
              <IconButton onClick={handleCloseQuery} id={`close-query-${layer.id}`}>
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} sx={{height: "85%"}}>
              <Box sx={{ display: "flex", height: "100%", outline: "1px gray solid", flexDirection: "column", justifyContent: "space-between", padding: 1, borderRadius: 2, color: "black" }}>
                <Box sx={{display: "flex", flexDirection: "column", width: "100%", rowGap: 1}}>
                  {expressions.map((expression, index) => {
                    if (index === 0) {
                      return (
                        <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly"}} key={`box-expression-${index}`} id={`box-expression-${layer.id}-${index}`}>
                          <Typography sx={{display: "flex", alignItems: "center", justifyContent: "center", width: "20%"}} key={`typography-connection-${index}`}>WHERE</Typography>
                          <Select sx={{width: "20%"}} value={expression.field} onChange={(event) => handleFieldChange(index, event)} key={`select-field-${index}`}
                            MenuProps={{
                              style: {
                                maxHeight: "300px",
                              },
                            }}
                          >
                            {layer && queryOpen && layer.fields.map((field, i) => (
                              <MenuItem value={field.name} key={`field-menu-item-${index}-${i}`}>
                                {field.alias}
                              </MenuItem>
                            ))}
                          </Select>
                          <Select sx={{width: "20%"}} value={expression.operator} onChange={(event) => handleOperatorChange(index, event)} key={`select-operator-${index}`}>
                            <MenuItem value="=" key={`operator-menu-item-${index}-IS`}>IS</MenuItem>
                            <MenuItem value="<>" key={`operator-menu-item-${index}-IS-NOT`}>IS NOT</MenuItem>
                          </Select>
                          <Select sx={{width: "20%"}} value={expression.value} onChange={(event) => handleValueChange(index, event)} key={`select-value-${index}`}
                            MenuProps={{
                              style: {
                                maxHeight: "300px",
                              },
                            }}
                          >
                            {(expression.field && expression.possibleValues.length > 0) && expression.possibleValues.map((possibleValue, i) => (
                              <MenuItem value={possibleValue} key={`possible-value-menu-item-${index}-${i}`}>{possibleValue}</MenuItem>
                            ))}
                          </Select>
                          <Box sx={{width: "10%"}}></Box>
                        </Box>
                        )
                    } else {
                      return (
                        <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly", rowGap: 1}} key={`box-expression-${index}`}>
                          <Select sx={{width: "20%"}} value={expression.connection} onChange={(event) => handleConnectionChange(index, event)} key={`select-connection-${index}`}>
                            <MenuItem value="AND" key={`connection-menu-item-${index}-AND`}>AND</MenuItem>
                            <MenuItem value="OR" key={`connection-menu-item-${index}-OR`}>OR</MenuItem>
                          </Select>
                          <Select sx={{width: "20%"}} value={expression.field} onChange={(event) => handleFieldChange(index, event)} key={`select-field-${index}`}
                            MenuProps={{
                              style: {
                                maxHeight: "300px",
                              },
                            }}
                          >
                            {layer && queryOpen && layer.fields.map((field, i) => (
                              <MenuItem value={field.name} key={`field-menu-item-${index}-${i}`}>
                                {field.alias}
                              </MenuItem>
                            ))}
                          </Select>
                          <Select sx={{width: "20%"}} value={expression.operator} onChange={(event) => handleOperatorChange(index, event)} key={`select-operator-${index}`}>
                            <MenuItem value="=" key={`operator-menu-item-${index}-IS`}>IS</MenuItem>
                            <MenuItem value="<>" key={`operator-menu-item-${index}-IS-NOT`}>IS NOT</MenuItem>
                          </Select>
                          <Select sx={{width: "20%"}} value={expression.value} onChange={(event) => handleValueChange(index, event)} key={`select-value-${index}`}
                            MenuProps={{
                              style: {
                                maxHeight: "300px",
                              },
                            }}
                          >
                            {(expression.field && expression.possibleValues.length > 0) && expression.possibleValues.map((possibleValue, i) => (
                              <MenuItem value={possibleValue} key={`possible-value-menu-item-${index}-${i}`}>{possibleValue}</MenuItem>
                            ))}
                          </Select>
                          <IconButton sx={{width: "10%"}}onClick={() => deleteExpression(index)} key={`close-button-${index}`}>
                            <Close />
                          </IconButton>
                        </Box>
                      )
                    }
                  })}
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                  <Button onClick={addExpression} sx={{backgroundColor: "#24a0ed", color: "black"}} id={`add-query-${layer.id}`}>Add Expression</Button>
                  <Button onClick={applyQuery} sx={{backgroundColor: "#ffc425", color: "black"}} id={`apply-query-${layer.id}`}>Apply Query</Button>
                  <Button onClick={resetQuery} sx={{backgroundColor: "#ff1a1a", color: "black"}} id={`reset-query-${layer.id}`}>Reset Query</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Modal open={queryOpen} onClose={handleCloseQuery}>
          <Box sx={modalStyle} id={`layer-query-content-${layer.id}`}>
            <Grid container>
              <Grid item xs={12}  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "15%" }}>
                <Typography variant="h6">{`Ekspresi Query - ${layer.title}`}</Typography>
                <IconButton onClick={handleCloseQuery} id={`close-query-${layer.id}`}>
                  <Close />
                </IconButton>
              </Grid>
              <Grid item xs={12} sx={{height: "85%"}}>
                <Box sx={{ display: "flex", height: "100%", outline: "1px gray solid", flexDirection: "column", justifyContent: "space-between", padding: 1, borderRadius: 2, color: "black" }}>
                  <Box sx={{display: "flex", flexDirection: "column", width: "100%", rowGap: 1}}>
                    {loading ? (expressions.map((expression, index) => {
                      if (index === 0) {
                        return (
                          <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly"}} key={`box-expression-${index}`} id={`box-expression-${layer.id}-${index}`}>
                            <Typography sx={{display: "flex", alignItems: "center", justifyContent: "center", width: "20%"}} key={`typography-connection-${index}`}>WHERE</Typography>
                            <Select sx={{width: "20%"}} value={expression.field} onChange={(event) => handleFieldChange(index, event)} key={`select-field-${index}`}
                              MenuProps={{
                                style: {
                                  maxHeight: "300px",
                                },
                              }}
                            >
                              {layer && queryOpen && layer.fields.map((field, i) => (
                                <MenuItem value={field.name} key={`field-menu-item-${index}-${i}`}>
                                  {field.alias}
                                </MenuItem>
                              ))}
                            </Select>
                            <Select sx={{width: "20%"}} value={expression.operator} onChange={(event) => handleOperatorChange(index, event)} key={`select-operator-${index}`}>
                              <MenuItem value="=" key={`operator-menu-item-${index}-IS`}>IS</MenuItem>
                              <MenuItem value="<>" key={`operator-menu-item-${index}-IS-NOT`}>IS NOT</MenuItem>
                            </Select>
                            <Select sx={{width: "20%"}} value={expression.value} onChange={(event) => handleValueChange(index, event)} key={`select-value-${index}`}
                              MenuProps={{
                                style: {
                                  maxHeight: "300px",
                                },
                              }}
                            >
                              {(expression.field && expression.possibleValues.length > 0) && expression.possibleValues.map((possibleValue, i) => (
                                <MenuItem value={possibleValue} key={`possible-value-menu-item-${index}-${i}`}>{possibleValue}</MenuItem>
                              ))}
                            </Select>
                            <Box sx={{width: "10%"}}></Box>
                          </Box>
                          )
                      } else {
                        return (
                          <Box sx={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly", rowGap: 1}} key={`box-expression-${index}`}>
                            <Select sx={{width: "20%"}} value={expression.connection} onChange={(event) => handleConnectionChange(index, event)} key={`select-connection-${index}`}>
                              <MenuItem value="AND" key={`connection-menu-item-${index}-AND`}>AND</MenuItem>
                              <MenuItem value="OR" key={`connection-menu-item-${index}-OR`}>OR</MenuItem>
                            </Select>
                            <Select sx={{width: "20%"}} value={expression.field} onChange={(event) => handleFieldChange(index, event)} key={`select-field-${index}`}
                              MenuProps={{
                                style: {
                                  maxHeight: "300px",
                                },
                              }}
                            >
                              {layer && queryOpen && layer.fields.map((field, i) => (
                                <MenuItem value={field.name} key={`field-menu-item-${index}-${i}`}>
                                  {field.alias}
                                </MenuItem>
                              ))}
                            </Select>
                            <Select sx={{width: "20%"}} value={expression.operator} onChange={(event) => handleOperatorChange(index, event)} key={`select-operator-${index}`}>
                              <MenuItem value="=" key={`operator-menu-item-${index}-IS`}>IS</MenuItem>
                              <MenuItem value="<>" key={`operator-menu-item-${index}-IS-NOT`}>IS NOT</MenuItem>
                            </Select>
                            <Select sx={{width: "20%"}} value={expression.value} onChange={(event) => handleValueChange(index, event)} key={`select-value-${index}`}
                              MenuProps={{
                                style: {
                                  maxHeight: "300px",
                                },
                              }}
                            >
                              {(expression.field && expression.possibleValues.length > 0) && expression.possibleValues.map((possibleValue, i) => (
                                <MenuItem value={possibleValue} key={`possible-value-menu-item-${index}-${i}`}>{possibleValue}</MenuItem>
                              ))}
                            </Select>
                            <IconButton sx={{width: "10%"}}onClick={() => deleteExpression(index)} key={`close-button-${index}`}>
                              <Close />
                            </IconButton>
                          </Box>
                        )
                      }
                    })) : null }
                  </Box>
                  <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button onClick={addExpression} sx={{backgroundColor: "#24a0ed", color: "black"}} id={`add-query-${layer.id}`}>Add Expression</Button>
                    <Button onClick={applyQuery} sx={{backgroundColor: "#ffc425", color: "black"}} id={`apply-query-${layer.id}`}>Apply Query</Button>
                    <Button onClick={resetQuery} sx={{backgroundColor: "#ff1a1a", color: "black"}} id={`reset-query-${layer.id}`}>Reset Query</Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default LayerQuery;
