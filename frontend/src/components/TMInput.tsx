import { FilterOptionsState } from "@mui/base/useAutocomplete/useAutocomplete";
import CardIcon from "@mui/icons-material/CreditCard";
import NumberIcon from "@mui/icons-material/FormatListNumberedRounded";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDownRounded";
import HashIcon from "@mui/icons-material/NumbersRounded";
import { alpha, Autocomplete, AutocompleteValue, Box, ListSubheader, useTheme } from "@mui/material";
import { AutocompleteRenderGroupParams } from "@mui/material/Autocomplete/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MuiTextField from "@mui/material/TextField";
import React, { createContext, FC, ReactNode, SyntheticEvent, useContext, useEffect, useState } from "react";
import { usePrevious } from "react-use";
import { CHECK_CARDS } from "../parsing/util";
import { VERIFIER_COLORS, VERIFIER_TYPES, VERIFIERS } from "./constants";
import InputUIWrapper from "./InputUIWrapper";
import TextField from "./TextField";


//----------------------------------------------------------------------------------------------------------------------
// component to enter the required cards for a game of Turing Machine
//----------------------------------------------------------------------------------------------------------------------
const TMInput: FC = () => {
  const theme = useTheme();

  const {
    hash, setHash,
    mode, setMode,
    setValid,
    testItems, setTestItems,
    nightmareCriteria, setNightmareCriteria,
  } = useContext(ComponentContext);

  const [verifierCount, setVerifierCount] = useState("4");
  const previousVerifierCount = usePrevious(verifierCount) || "4";

  useEffect(() => {
    if ( verifierCount < previousVerifierCount ) {
      let items = testItems.sort((a, b) => a.verifier.localeCompare(b.verifier)) || [];
      if ( items.length > 4 ) setTestItems(items.slice(0, -1));
      if ( nightmareCriteria.length > 4 ) setNightmareCriteria(nightmareCriteria.slice(0, -1));
    }
  }, [verifierCount, previousVerifierCount, nightmareCriteria, setNightmareCriteria, testItems, setTestItems]);

  useEffect(() => {
    // when mode changes reset TestItems and NightmareCriteria
    setTestItems([]);
    setNightmareCriteria([]);
  }, [mode, setNightmareCriteria, setTestItems]);

  useEffect(() => {
    // reformat hash
    setHash(hash.replace("#", "")
      .replaceAll(" ", "")
      .split(/(.{3})/)
      .filter((e) => e)
      .join(" "));
  }, [hash, setHash]);

  useEffect(() => {
    // check if entered data are valid
    function getItemValues(cb: {(value: TestItem): any}) {
      return testItems.sort((a, b) => a.verifier.localeCompare(b.verifier)).map(cb).filter(value => value);
    }

    setValid(false);
    if ( Number(verifierCount) >= 4 && Number(verifierCount) <= 6 ) {
      const checkCount = (cb: {(value: TestItem): any;}) => getItemValues(cb).length === Number(verifierCount);
      const checkVerifierCount = () => checkCount(value => value.verifierCard?.cryptId);

      if ( mode === 0 ) {
        setValid(checkCount(value => value.ind) && checkVerifierCount());
      } else if ( mode === 1 ) {
        setValid(checkCount(value => value.ind) && checkVerifierCount() && checkCount(value => value.fake));
      } else if ( mode === 2 ) {
        setValid((nightmareCriteria.length === Number(verifierCount)) && checkVerifierCount());
      }
    }

  }, [mode, verifierCount, testItems, nightmareCriteria, setValid]);

  return (
    <>
      <FormControl fullWidth={true}>
        <Box p={2} pt={1} pb={0} mb={0.5} sx={{background: alpha(theme.palette.primary.main, 0.1)}}>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Choose Mode
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={mode}
            onChange={(e) => setMode(Number(e.target.value))}
          >
            <FormControlLabel value={0} control={<Radio />} label="Classic" />
            <FormControlLabel value={1} control={<Radio />} label="Extreme" />
            <FormControlLabel value={2} control={<Radio />} label="Nightmare" />
          </RadioGroup>
        </Box>
        <Box mb={0.5}>
          <Grid container spacing={0.5}>
            <Grid item xs={3}>
              <TextField prefixId="manual-registration__verifier-count"
                         icon={<NumberIcon />}
                         type="number"
                         min={4} max={6}
                         value={verifierCount}
                         onChange={(e) => setVerifierCount(e)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField prefixId="manual-registration__hash"
                         icon={<HashIcon />}
                         value={hash}
                         maxChars={10}
                         onChange={(value) => setHash(value.toUpperCase())}
                         withReset={true}
                         onReset={() => setHash("")}
              />
            </Grid>
          </Grid>
        </Box>
      </FormControl>
      {mode === 2
        ? <NightmareInput countVerifiers={Number(verifierCount)} />
        : <StandardInput countVerifiers={Number(verifierCount)} isExtreme={mode === 1} />}
    </>
  );
};

export default TMInput;


//----------------------------------------------------------------------------------------------------------------------
// wrapper for MUI Autocomplete
//----------------------------------------------------------------------------------------------------------------------
interface CardInputProps {
  filterOptions?: (options: any, state: FilterOptionsState<any>) => unknown[];
  options: ReadonlyArray<any>;
  optionLabel: (option: AutocompleteValue<any, any, any, any>) => string;
  groupBy?: (option: AutocompleteValue<any, any, any, any>) => any;
  renderGroup?: (params: AutocompleteRenderGroupParams) => ReactNode;
  onChange?: (event: SyntheticEvent, newValue: AutocompleteValue<any, any, any, any>) => void;
  isOptionEqualToValue?: (option: AutocompleteValue<any, any, any, any>, newValue: AutocompleteValue<any, any, any, any>) => boolean;
  maxSelectedValues: number;
  selectedOptions: AutocompleteValue<any, any, any, any>;
  height?: string | number;
  width?: string | number;

  customFontSize?: string;
  customRadius?: string;
  tagColor?: string;
  tagBackgroundColor?: string;
  tagWidth?: number | string;
  inputHeight?: number;
  disabled?: boolean;
  multiline?: boolean;
  sx?: {};
}

const CardInput: FC<CardInputProps> = (props) => {
  const theme = useTheme();

  return (
    <Autocomplete
      id={"Autocomplete-Component"}
      disabled={props.disabled}
      filterOptions={props.filterOptions}
      popupIcon={<KeyboardArrowDown />}
      multiple
      autoHighlight
      disableListWrap={true}
      disableClearable={true}
      value={props.selectedOptions}
      filterSelectedOptions
      options={props.options}
      getOptionLabel={props.optionLabel}
      getOptionDisabled={() => props.selectedOptions?.length >= props.maxSelectedValues}
      isOptionEqualToValue={props.isOptionEqualToValue}
      groupBy={props.groupBy}
      renderGroup={props.renderGroup}
      onChange={props.onChange}
      onKeyDown={(event) => {
        if ( !/^\d$/.test(event.key) && !["Backspace", "Enter", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(event.key) ) {
          event.preventDefault();
        }
      }}
      renderInput={(params) => (
        <MuiTextField {...params} type={"number"} sx={{
          // set type to number, to show number input on mobiles,
          // and remove the spinners on input via css
          input: {
            "&[type=number]": {
              "-moz-appearance": "textfield",
            },
            "&::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
            "&::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
          },
        }} />
      )}
      ChipProps={{
        sx: {
          borderRadius: 0.25,
          backgroundColor: (props.tagBackgroundColor),
          color: (props.tagColor),
          width: (props.tagWidth),
        },
      }}
      sx={{
        paddingBottom: (props.multiline ? 0.25 : undefined),
        "& .MuiInputBase-root": {
          height: (props.multiline ? theme.spacing(11) : theme.spacing(6)),
          borderRadius: 0.25,
        },
        "& .MuiOutlinedInput-root": {
          padding: 0,
          paddingTop: (props.multiline ? 0.5 : undefined),
          paddingLeft: 0.5,
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "none",
          borderRadius: 0.25,
        },
        flexGrow: "1",
        ...props.sx,
      }}
    />
  );
};

//----------------------------------------------------------------------------------------------------------------------
// component for the input of criteria cards
//----------------------------------------------------------------------------------------------------------------------
interface CriteriaInputProps extends VerifierInputProps {
  maxSelectedValues: number;
  selectedOptions: number[];
  filterOptions?: (options: number[], state: FilterOptionsState<number>) => number[];
  onChange: (event: SyntheticEvent, newValue: number[]) => void;
  sx?: {};
}

const CriteriaInput: FC<CriteriaInputProps> = (props) => {
  return (
    <CardInput key={"criteria-" + props.verifier} {...props}
               filterOptions={props.filterOptions}
               onChange={props.onChange}
               options={criteriaCards}
               optionLabel={(option: number) => String(option)}
               selectedOptions={props.selectedOptions}
               maxSelectedValues={props.maxSelectedValues}
               multiline={props.selectedOptions.length > 4}
               tagBackgroundColor={(alpha("#18283a", 0.75))}
               tagColor={"#ea5b0c"}
               tagWidth={66}
               sx={props.sx}
    />
  );
};


//----------------------------------------------------------------------------------------------------------------------
// component for the input of verifier cards
//----------------------------------------------------------------------------------------------------------------------
interface VerifierInputProps {
  verifier: string;
  sx?: {};
}

const VerifierInput: FC<VerifierInputProps> = (props) => {
  const {testItems, setTestItems} = useContext(ComponentContext);

  const selectedVerifiers = testItems.map(value => (value.verifierCard?.cryptId)).filter(value => value) || [] as number[];
  const selectedColor = testItems.map(value => (value.verifierCard?.colorId)).filter(value => value !== undefined)[0];

  const getCryptOrEmpty = (verifier: TestItem | undefined) => verifier?.verifierCard ? [verifier.verifierCard] : [];
  const isSelectedVerifier = (option: VerifierCard) => selectedVerifiers.includes(option.cryptId);
  const hasColor = (option: VerifierCard) => (selectedColor !== undefined) ? option.colorId === selectedColor : true;

  return (
    <CardInput key={"verifier-" + props.verifier} {...props}
               filterOptions={(options: VerifierCard[], state) => {
                 return options
                   .filter((option) => hasColor(option))
                   .filter((option) => !isSelectedVerifier(option))
                   .filter((option) => String(option.cryptId).includes(state.inputValue));
               }}
               onChange={(_, newValue: VerifierCard[]) => {
                 let cleaned = testItems.filter(item => item.verifier !== props.verifier) || [];
                 setTestItems([...cleaned,
                   {
                     verifier: props.verifier,
                     ind: testItems.filter(item => item.verifier === props.verifier)[0]?.ind,
                     fake: testItems.filter(item => item.verifier === props.verifier)[0]?.fake,
                     verifierCard: newValue[0],
                   }],
                 );
               }}
               options={verifierCards
                 .sort((a, b) => -b.cryptId + a.cryptId)
                 .sort((a, b) => -b.colorId + a.colorId)
               }
               isOptionEqualToValue={(option: VerifierCard, newValue: VerifierCard) => option.cryptId === newValue.cryptId}
               optionLabel={(card: VerifierCard) => String(card?.cryptId)}
               selectedOptions={getCryptOrEmpty(testItems.find(item => item.verifier === props.verifier))}
               maxSelectedValues={1}
               groupBy={(card: VerifierCard) => card.colorId}
               renderGroup={(params) => (
                 <li key={params.key}>
                   <ListSubheader component={"div"} sx={{
                     backgroundColor: `${VERIFIER_COLORS[Number(params.group)]}`,
                     fontWeight: 900,
                     fontSize: "x-large",
                     lineHeight: "unset",
                     height: "28px !important",
                   }}>{VERIFIER_TYPES(Number(params.group))}</ListSubheader>
                   <ul style={{padding: 0}}>{params.children}</ul>
                 </li>
               )}
               tagBackgroundColor={VERIFIER_COLORS[selectedColor]}
               tagWidth={75}
               sx={props.sx}
    />
  );
};


interface InputProps {
  countVerifiers: number;
  isExtreme?: boolean;
}

//----------------------------------------------------------------------------------------------------------------------
// component for classic and extreme mode
//----------------------------------------------------------------------------------------------------------------------
const StandardInput: FC<InputProps> = (props) => {
  const {testItems, setTestItems} = useContext(ComponentContext);

  const getSelectedOptions = (verifier: string) => {
    const item = testItems.find(item => item.verifier === verifier);
    let retVal: number[] = [];

    if ( item?.ind ) {
      retVal.push(item.ind);
      if ( props.isExtreme && item.fake ) {
        retVal.push(item.fake);
      }
    }
    return retVal;
  };
  const filterNumbersInInd = (option: number): boolean => !testItems.map(value => value.ind).includes(option);
  const filterNumbersInFake = (option: number): boolean => !testItems.map(value => value.fake).includes(option);

  const getCardIds = (items: TestItem[]) => items.map(value => value.ind).filter(value => value);
  const filterMinMaxNumbers = (option: number, verifier: string) => {
    const upperBound = testItems.filter(value => value.verifier > verifier);
    const lowerBound = testItems.filter(value => value.verifier < verifier);
    return option < Math.min(...getCardIds(upperBound)) && option > Math.max(...getCardIds(lowerBound));
  };
  const filterNumbers = (option: number, verifier: string) =>
    props.isExtreme ? filterNumbersInInd(option) : filterMinMaxNumbers(option, verifier);
  const filterNumbersForExtremeMode = (option: number) =>
    props.isExtreme ? filterNumbersInFake(option) : true;

  return (
    <>
      {VERIFIERS(props.countVerifiers).map((verifier: Verifier) =>
        <InputUIWrapper key={verifier} icon={verifier}>
          <CriteriaInput {...props} verifier={verifier}
                         selectedOptions={getSelectedOptions(verifier)}
                         filterOptions={(options, state) =>
                           options.filter((option) => filterNumbers(option, verifier))
                             .filter((option) => filterNumbersForExtremeMode(option))
                             .filter((option) => String(option).includes(state.inputValue))}
                         onChange={(_, selected) => {
                           setTestItems([...(testItems.filter(item => item.verifier !== verifier) || []),
                             {
                               verifier,
                               ind: Number(selected[0]),
                               fake: Number(selected[1]),
                               verifierCard: testItems.find(item => item.verifier === verifier)?.verifierCard,
                             }] as TestItem[]);
                         }}
                         maxSelectedValues={props.isExtreme ? 2 : 1}
                         sx={{flexBasis: "58%"}}
          />
          <VerifierInput {...props} verifier={verifier} sx={{flexBasis: "42%"}} />
        </InputUIWrapper>,
      )}
    </>
  );
};

//----------------------------------------------------------------------------------------------------------------------
// components for nightmare mode
//----------------------------------------------------------------------------------------------------------------------
const NightmareInput: FC<InputProps> = (props) => {
  return (
    <>
      <NightmareCriteriaInput key={"nightmare-criteria"} {...props} />
      <NightmareVerifierInput key={"nightmare-verifier"} {...props} />
    </>
  );
};

const NightmareCriteriaInput: FC<InputProps> = (props) => {
  const {nightmareCriteria, setNightmareCriteria} = useContext(ComponentContext);
  return (
    <InputUIWrapper icon={<CardIcon />}>
      <CriteriaInput {...props} verifier={"all"}
        // enforce sorted values for criteria cards
                     selectedOptions={nightmareCriteria.sort((a, b) => a - b)}
                     onChange={(_, newValue) => setNightmareCriteria(newValue)}
                     maxSelectedValues={props.countVerifiers}
      /> </InputUIWrapper>
  );
};

const NightmareVerifierInput: FC<InputProps> = (props) => {
  return (
    <Grid container>
      {VERIFIERS(props.countVerifiers).map((verifier: Verifier) =>
        <Grid key={"grid-" + verifier} item xs={6}>
          <InputUIWrapper icon={verifier}>
            <VerifierInput {...props} verifier={verifier} />
          </InputUIWrapper>
        </Grid>,
      )}
    </Grid>
  );
};


//----------------------------------------------------------------------------------------------------------------------
// Context and Provider (internal, external)
//----------------------------------------------------------------------------------------------------------------------
type TestItem = {
  verifier: string,
  ind: number,
  fake: number,
  verifierCard: VerifierCard
}

interface CommonContextType {
  isValid: boolean,
  hash: string,
  mode: number,
}

interface TMInputContextType extends CommonContextType {
  ind: number[],
  fake: number[] | undefined,
  crypt: number[],
  color: number,
}

interface ComponentContextType extends CommonContextType {
  setValid: (value: boolean) => void
  setHash: (value: string) => void
  setMode: (value: number) => void

  testItems: TestItem[]
  setTestItems: (value: TestItem[]) => void
  nightmareCriteria: number[],
  setNightmareCriteria: (value: number[]) => void
}

export const TMInputContext = createContext<TMInputContextType>({
  isValid: false,
  hash: "",
  mode: 0,
  ind: [],
  fake: undefined,
  crypt: [],
  color: 0,
} as TMInputContextType);

const ComponentContext = createContext<ComponentContextType>({
  isValid: false,
  setValid() {
  },
  hash: "",
  setHash() {
  },
  mode: 0,
  setMode() {
  },
  testItems: [],
  setTestItems() {
  },
  nightmareCriteria: [],
  setNightmareCriteria() {
  },
} as ComponentContextType);


type TMInputProviderProps = {
  children: ReactNode;
};

export const TMInputProvider: FC<TMInputProviderProps> = ({children}) => {
  // internal state
  const [testItems, setTestItems] = useState<TestItem[]>([]);
  const [nightmareCriteria, setNightmareCriteria] = useState<number[]>([]);

  // exposed values
  const [isValid, setValid] = useState<boolean>(false);
  const [hash, setHash] = useState<string>("");
  const [mode, setMode] = useState<number>(0);
  const [ind, setInd] = useState<number[]>([]);
  const [fake, setFake] = useState<number[] | undefined>(undefined);
  const [crypt, setCrypt] = useState<number[]>([]);
  const [color, setColor] = useState<number>(0);

  useEffect(() => {
    // only expose valid state
    if ( isValid ) {
      // sort test items by verifier
      const sortedTestItems = testItems.sort((a, b) => -b?.verifier.localeCompare(a?.verifier));

      setColor(testItems[0]?.verifierCard?.colorId || 0);
      setInd((mode !== 2) ? sortedTestItems.map(value => value.ind) : nightmareCriteria);
      setFake((mode === 1) ? sortedTestItems.map(value => value.fake) : undefined);
      setCrypt(sortedTestItems.map(value => value.verifierCard?.cryptId));
    }
  }, [isValid, mode, testItems, nightmareCriteria]);

  return (
    <TMInputContext.Provider value={{isValid, hash, ind, fake, crypt, color, mode}}>
      <ComponentContext.Provider
        value={{
          isValid,
          setValid,
          hash,
          setHash,
          testItems,
          setTestItems,
          nightmareCriteria,
          setNightmareCriteria,
          mode,
          setMode,
        }}>
        {children}
      </ComponentContext.Provider>
    </TMInputContext.Provider>
  );
};


//----------------------------------------------------------------------------------------------------------------------
// Criteria and Verifier Cards
//----------------------------------------------------------------------------------------------------------------------
const criteriaCards = Array.from({length: 48}, (_, k) => k + 1);

export type VerifierCard = {
  colorId: number;
  cryptId: number;
}

const verifierCards = (() => {
  const cards: VerifierCard[] = [];
  CHECK_CARDS.forEach((value, color) => value.filter(value => value)
    .forEach((value) => cards.push({colorId: color, cryptId: value} as VerifierCard)));
  return cards;
})();
