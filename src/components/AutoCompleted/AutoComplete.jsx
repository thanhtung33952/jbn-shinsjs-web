import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 9
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  inputInput: {
    padding: 12,
    borderRadius: 0,
    zIndex: 2
  },
  inputRoot: {
    "& fieldset": {
      borderRadius: 5,
      borderColor: theme.palette.secondary.main + `${"!important"}`,
      backgroundColor: "#fff"
    }
  },
  inputError: {
    "& fieldset": {
      borderColor: "#f44336 !important"
    }
  },
  rootTextField: {
    "& p": {
      marginLeft: "0 !important"
    }
  },
  divider: {
    height: theme.spacing(2)
  },
  fabProgress: {
    color: "#b7b7b7",
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1
  },
  rowInputFormReadonly: {
    margin: 0,
    minWidth: "70%",
    "& fieldset": {
      borderRadius: 5,
      borderColor: "transparent !important",
      backgroundColor: "#fff"
    },
    "& input": {
      color: "#222",
      padding: 12,
      borderRadius: 0,
      zIndex: 2
    },
    "& p": {
      marginLeft: 0
    }
  }
});

function renderInput(inputProps) {
  const {
    loadding,
    errorInput,
    messError,
    InputProps,
    classes,
    ref,
    ...other
  } = inputProps;
  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        className={classes.rootTextField}
        error={errorInput}
        helperText={
          errorInput ? (messError ? messError : "必ず入力してください。") : ""
        }
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
            error: classes.inputError
          },
          ...InputProps
        }}
        {...other}
      />
      {loadding && (
        <CircularProgress size={20} className={classes.fabProgress} />
      )}
    </React.Fragment>
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected =
    selectedItem && selectedItem.label.indexOf(suggestion.label) > -1
      ? true
      : false;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
        minHeight: 40
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadding: false,
      errorInput: false
    };
  }

  // handle change value input
  handleInputChange = event => {
    const { onChangeInput } = this.props;
    if (onChangeInput) {
      onChangeInput(event.target.value);
    }
  };

  // handle Blur input
  handleInputBlur = itemSelect => {
    const { isRequired, onBlurInput } = this.props;
    // hiển thị lỗi trên input
    // validation field input. inputValue == "" thi itemselect của autocomplete cũng bằng null
    let error = isRequired && !itemSelect ? true : false;
    this.setState({ errorInput: error });

    // gửi handle blur lên để validation toàn cục
    if (onBlurInput) {
      onBlurInput(itemSelect, error);
    }
  };

  // handle change item select
  handleChange = item => {
    const { onChangeItem } = this.props;
    if (onChangeItem) {
      onChangeItem(item);
    }
  };

  render = () => {
    const { errorInput } = this.state;
    const {
      classes,
      placeholder,
      value,
      listData,
      loadding,
      messError,
      permission
    } = this.props;
    return (
      <React.Fragment>
        {/* permission == R thì hiển thị label (chỉ đọc) */}
        {permission === "R" ? (
          <TextField
            disabled={true}
            className={classes.rowInputFormReadonly}
            placeholder={placeholder}
            value={value ? value : ""}
            type="text"
            margin="normal"
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.rootInput,
                input: classes.thisInput,
                error: classes.thisInputError
              }
            }}
          />
        ) : (
          <div className={classes.root}>
            <Downshift
              id="downshift-options"
              onChange={this.handleChange}
              itemToString={item => (item ? item.label : "")}
            >
              {({
                clearSelection,
                getInputProps,
                getItemProps,
                getMenuProps,
                highlightedIndex,
                isOpen,
                selectedItem
              }) => {
                const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                  onChange: event => {
                    if (event.target.value === "") {
                      clearSelection();
                    }
                    this.handleInputChange(event);
                  },
                  onBlur: () => {
                    this.handleInputBlur(selectedItem);
                  },
                  placeholder: placeholder,
                  value: value ? value : ""
                });

                return (
                  <div className={classes.container}>
                    {renderInput({
                      loadding,
                      errorInput,
                      messError,
                      fullWidth: true,
                      classes,
                      InputProps: { onBlur, onChange, onFocus },
                      inputProps
                    })}

                    <div {...getMenuProps()}>
                      {isOpen ? (
                        <Paper className={classes.paper} square>
                          {listData.map((suggestion, index) =>
                            renderSuggestion({
                              suggestion,
                              index,
                              itemProps: getItemProps({ item: suggestion }),
                              highlightedIndex,
                              selectedItem
                            })
                          )}
                        </Paper>
                      ) : null}
                    </div>
                  </div>
                );
              }}
            </Downshift>
          </div>
        )}
      </React.Fragment>
    );
  };
}
AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  loadding: PropTypes.bool,
  permission: PropTypes.string,
  isRequired: PropTypes.bool,
  listData: PropTypes.array,
  placeholder: PropTypes.string,
  messError: PropTypes.string,
  value: PropTypes.string,
  onChangeInput: PropTypes.func,
  onChangeItem: PropTypes.func,
  onBlurInput: PropTypes.func
};
export default withStyles(styles)(AutoComplete);
