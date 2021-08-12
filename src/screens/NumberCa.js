import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

//APOLO CLIENT
import { gql, useQuery } from '@apollo/client';
import { widthPercentageToDP } from 'react-native-responsive-screen';

let dataCaGlobal;
const ITEM_OF_PAGE = 6;

const GetCa = gql`
 query{
  getCa{
    tableData{
      dies
      province
      todayCa
      totalCa
    }
    totalCa {
      vi {beingTreated treatment title die cured}
      world {beingTreated treatment title die cured}
    }
    createdAt
    _id
  }
}`

export const NumberCaScreen = () => {
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState([]);
    const [dataTotalCa, setDataTotalCa] = useState(null);

    const { loading: loadingCa, error: errorCa, data: dataCa, refetch: refetchCa } = useQuery(GetCa);

    useEffect(() => {
        if (dataCa?.getCa?.tableData) {
            dataCaGlobal = { ...dataCa?.getCa };
            dataCaGlobal.tableData = Array.from(dataCaGlobal.tableData).slice(1);

            const dataToSet = Array.from(dataCaGlobal.tableData).slice(0, ITEM_OF_PAGE);

            setItemsPerPage(dataToSet);
            setDataTotalCa(dataCaGlobal.totalCa);
        }
    }, [dataCa])

    useEffect(() => {
        if (dataCaGlobal) {
            const endIndex = (page + 1) * ITEM_OF_PAGE;
            const startindex = (page) * ITEM_OF_PAGE
            const dataToSet = Array.from(dataCaGlobal.tableData).slice(startindex, endIndex);

            setItemsPerPage(dataToSet);
        }
    }, [page]);

    return (
        <>
            <View style={styles.wrapperTitle}>
                <Text style={styles.title}>Table total in Vietnameses</Text>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Province</DataTable.Title>
                    <DataTable.Title numeric>Totals</DataTable.Title>
                    <DataTable.Title numeric>Today</DataTable.Title>
                    <DataTable.Title numeric>Die</DataTable.Title>
                </DataTable.Header>

                {itemsPerPage.map((item, index) => <DataTable.Row key={`${index}`}>
                    <DataTable.Cell>{item.province}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.totalCa}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.todayCa}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.dies}</DataTable.Cell>
                </DataTable.Row>)}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.floor((dataCaGlobal?.tableData?.length ?? 0) / ITEM_OF_PAGE) + 1}
                    onPageChange={(page) => setPage(page)}
                    label={dataCaGlobal?.tableData?.length ? ((page === 0 || (page > (Math.floor(dataCaGlobal?.tableData?.length / ITEM_OF_PAGE) - 2) && (page + 1) < Math.floor(dataCaGlobal?.tableData?.length / ITEM_OF_PAGE))) ? 'Page ' : page + " -") + ((page + 1) >= Math.floor(dataCaGlobal?.tableData?.length / ITEM_OF_PAGE) ? '' : page + 1) + ((page) >= Math.floor(dataCaGlobal?.tableData?.length / ITEM_OF_PAGE) ? 'End page ' : " of ") + Math.floor(dataCaGlobal?.tableData?.length / ITEM_OF_PAGE) : ''}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    showFastPagination
                    optionsLabel={'Rows per page'}
                />
            </DataTable>
            <View style={styles.wrapperTitle}>
                <Text style={styles.title}>Vietnameses</Text>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Case numbers</DataTable.Title>
                    <DataTable.Title numeric>Being treated</DataTable.Title>
                    <DataTable.Title numeric>Cured</DataTable.Title>
                    <DataTable.Title numeric>Dies</DataTable.Title>
                </DataTable.Header>

                {dataTotalCa && <DataTable.Row>
                    <DataTable.Cell>{dataTotalCa.vi.treatment}</DataTable.Cell>
                    <DataTable.Cell numeric>{dataTotalCa.vi.beingTreated}</DataTable.Cell>
                    <DataTable.Cell numeric>{dataTotalCa.vi.cured}</DataTable.Cell>
                    <DataTable.Cell numeric>{dataTotalCa.vi.die}</DataTable.Cell>
                </DataTable.Row>}
            </DataTable>
            <View style={styles.wrapperTitle}>
                <Text style={styles.title}>The World</Text>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Case numbers</DataTable.Title>
                    <DataTable.Title numeric>Being treated</DataTable.Title>
                    <DataTable.Title numeric>Cured</DataTable.Title>
                    <DataTable.Title numeric>Dies</DataTable.Title>
                </DataTable.Header>

                {dataTotalCa && <DataTable.Row>
                    <DataTable.Cell>{dataTotalCa.world.treatment}</DataTable.Cell>
                    <DataTable.Cell numeric>{dataTotalCa.world.beingTreated}</DataTable.Cell>
                    <DataTable.Cell numeric>{dataTotalCa.world.cured}</DataTable.Cell>
                    <DataTable.Cell numeric>{dataTotalCa.world.die}</DataTable.Cell>
                </DataTable.Row>}
            </DataTable>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: widthPercentageToDP(3.5)
    },
    wrapperTitle: {
        paddingHorizontal: 8,
        marginVertical: 8,
    },
})