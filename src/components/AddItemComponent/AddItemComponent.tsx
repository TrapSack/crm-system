import {
  faChevronDown,
  faSearch,
  faUserCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

import theme from "@/config/styles/theme";
import { getCurrentDateString } from "@/features/helpers/getCurrentDateString";
import { useAppDispatch } from "@/features/hooks";
import { addItemToBoard } from "@/features/Redux/slices/boardsSlice";
import { IClient } from "@/models/client";
import { IDeal } from "@/models/single-deal";

import Button from "../Button";

// TODO: Replace with useForm
//       Add validation
//       Add memo: complete

export default function AddItemComponent({ boardType, setIsOpen, isOpen }) {
  const dispatch = useAppDispatch();

  const [item, setItem] = useState<IDeal>({
    id: "",
    currency: "BYN",
    name: "",
    date: getCurrentDateString(),
    price: 0.0,
    status: boardType,
    client: [{ id: nanoid(), name: "" }],
  });

  const onChangeInputName = (value) =>
    setItem((prev) => ({
      ...prev,
      name: value,
    }));

  const onChangeInputPrice = (value) =>
    !isNaN(Number(value))
      ? setItem((prev) => ({
          ...prev,
          price: value,
        }))
      : null;

  const onSubmit = () => {
    dispatch(addItemToBoard({ ...item, id: nanoid() }));
    setItem({
      id: "",
      currency: "BYN",
      name: "",
      date: getCurrentDateString(),
      price: 0.0,
      status: boardType,
      client: [{ id: nanoid(), name: "" }],
    });
    setIsOpen(false);
  };

  const onClose = () => {
    setItem({
      id: "",
      currency: "BYN",
      name: "",
      date: getCurrentDateString(),
      price: 0.0,
      status: boardType,
      client: [{ id: nanoid(), name: "" }],
    });
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AddItemContainer>
      <div>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <div>
            <FieldInput
              type="text"
              id="name"
              name="name"
              placeholder="Deal #"
              value={item.name}
              onChange={(e) => onChangeInputName(e.target.value)}
            />
          </div>
        </Field>
        <Field>
          <FieldLabel>Price and currency</FieldLabel>
          <DualItems>
            <FieldInput
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              value={item.price}
              onChange={(e) => onChangeInputPrice(e.target.value)}
            />
            <SelectContainerMemo
              selectedCurrency={item.currency}
              setItem={setItem}
            />
          </DualItems>
        </Field>
        <ClientSelectMemo clients={item.client} setItem={setItem} />
      </div>
      <ButtonContainer>
        <Button buttonType="blue" onClick={onSubmit}>
          Submit
        </Button>
        <Button buttonType="transparent" ml={15} onClick={onClose}>
          Cancel
        </Button>
      </ButtonContainer>
    </AddItemContainer>
  );
}

const SelectContainer = ({
  selectedCurrency = null,
  setItem,
}: {
  selectedCurrency: string;
  setItem: Dispatch<SetStateAction<IDeal>>;
}) => {
  const [showItems, setShowItems] = useState(false);
  const dropdownitems = ["BYN", "USD", "RUB", "EUR"];

  const onChangeCurrency = (currency: string) => {
    setItem((prev) => ({
      ...prev,
      currency,
    }));
    setShowItems(false);
  };

  return (
    <div>
      <SelectItem onClick={() => setShowItems(!showItems)}>
        {selectedCurrency && <span>{selectedCurrency}</span>}
        <FontAwesomeIcon icon={faChevronDown} />
      </SelectItem>
      {showItems && (
        <DropDown>
          {dropdownitems.map((item) => (
            <DropDownItem key={item} onClick={() => onChangeCurrency(item)}>
              {item}
            </DropDownItem>
          ))}
        </DropDown>
      )}
    </div>
  );
};

const SelectContainerMemo = memo(SelectContainer);

const ClientSelect = ({
  clients,
  setItem,
}: {
  clients: IClient[];
  setItem: Dispatch<SetStateAction<IDeal>>;
}) => {
  const addClient = () =>
    setItem((prev) => ({
      ...prev,
      client: [...clients, { id: nanoid(), name: "" }],
    }));

  const removeClient = (id: string) =>
    setItem((prev) => ({
      ...prev,
      client: prev.client.filter((client) => client.id !== id),
    }));

  const onChangeClientName = (id, value) =>
    setItem((prev) => ({
      ...prev,
      client: prev.client.map((client) =>
        client.id === id ? { ...client, name: value } : client
      ),
    }));

  return (
    <ClientSelectContainer>
      <FieldLabel>Client</FieldLabel>
      {clients.map((client) => (
        <ClientCardContainer key={client.id}>
          <ClientInputContainer>
            <IconContainer>
              <FontAwesomeIcon
                icon={faUserCircle}
                color={theme.colors.lightGray3}
              />
            </IconContainer>
            <input
              type="text"
              name=""
              id=""
              placeholder="Name"
              onChange={(e) => onChangeClientName(client.id, e.target.value)}
            />
            <IconContainer>
              <FontAwesomeIcon
                icon={faSearch}
                color={theme.colors.lightGray3}
              />
            </IconContainer>
          </ClientInputContainer>
          {clients.length > 1 && (
            <DeleteClientButton onClick={() => removeClient(client.id)}>
              <FontAwesomeIcon icon={faXmark} />
            </DeleteClientButton>
          )}
        </ClientCardContainer>
      ))}

      <AddClientLink onClick={() => addClient()}>+ Add client</AddClientLink>
    </ClientSelectContainer>
  );
};

const ClientSelectMemo = memo(ClientSelect);

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transform: translateX(50%);
  background: ${({ theme }) => theme.colors.pageColor};
  border-radius: 6px;
  box-shadow: 0px 5px 10px -1px rgba(34, 60, 80, 0.2);
  animation: toggle-opacity 0.2s alternate;
  user-select: none;

  @keyframes toggle-opacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const DropDownItem = styled.div`
  padding: 5px 20px;
  cursor: pointer;

  font-size: 15px;

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray2};
  }
`;

const AddItemContainer = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.pageColor};
  animation: up 0.3s alternate;

  &::-webkit-scrollbar {
    display: none;
  }

  @keyframes up {
    0% {
      height: 0px;
    }

    100% {
      height: 277px;
    }
  }
`;

const FieldLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dateGray};
`;

const FieldInput = styled.input`
  padding: 5px 7px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightGray2};
  border-radius: 3px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.dateGray};
    opacity: 0.7;
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    transition: border 0.1s ease-in;
  }

  &[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const DualItems = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
`;

const Field = styled.div`
  margin: 5px 0;
`;

const SelectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 7px;
  margin-left: 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray2};
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    transition: border 0.1s ease-in;
  }
`;

const ClientSelectContainer = styled.div`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray2};
`;

const ClientInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  padding: 5px;
  margin: 5px 0;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray2};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    margin-right: 5px;
    border-right: 1px solid ${({ theme }) => theme.colors.lightGray2};
  }

  & svg {
    height: 17px;
  }
`;

const AddClientLink = styled.span`
  color: ${({ theme }) => theme.colors.lightGray3};
  font-size: 13px;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.lightGray3};
  cursor: pointer;

  &:hover {
    border: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ClientCardContainer = styled.div`
  display: grid;
  grid-template-columns: 12fr 1fr;
`;

const DeleteClientButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
