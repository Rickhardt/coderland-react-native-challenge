import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from 'react';

interface ApiElement {
    id: string;
    name: string;
    avatar: string;
}

export default function CustomList() {
    const [apiData, setApiData] = useState<ApiElement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setError(null);
            
            const response = await fetch('https://6172cfe5110a740017222e2b.mockapi.io/elements');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data: ApiElement[] = await response.json();
            setApiData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const Item = ({ item }: { item: ApiElement }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.avatar }}></Image>
            <Text style={styles.itemText}>ID: {item.id}</Text>
            <Text style={styles.itemText}>Name: {item.name}</Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>API Data</Text>
        {apiData.length === 0 ? (
          <Text >No data to show</Text>
        ) : (
          <FlatList
            data={apiData}
            renderItem={Item}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            style={styles.list}
          />
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    loadingText: {
        fontSize: 16,
        marginTop: 10,
    },

    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    
    list: {
        flex: 1,
    },

    itemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        marginVertical: 4,
        borderRadius: 8,
    },

    itemText: {
        fontSize: 16,
        marginVertical: 2,
    }
});