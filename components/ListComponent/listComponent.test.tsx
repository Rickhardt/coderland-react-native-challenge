import { render, screen, waitFor } from '@testing-library/react-native';
import CustomList from '../../components/ListComponent/listComponent';

interface ApiElement {
  id: string;
  name: string;
  avatar: string;
}

// Mock fetch properly for TypeScript with Jest
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('CustomList Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should display loading layout while data is loading', () => {
    // Mock fetch to never resolve (stays loading)
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(<CustomList />);

    expect(screen.getByText('Loading...')).toBeTruthy();
    // ActivityIndicator should be present (checking for loading state)
  });

  it('should make request to endpoint when screen is accessed', () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    render(<CustomList />);

    expect(mockFetch).toHaveBeenCalledWith('https://6172cfe5110a740017222e2b.mockapi.io/elements');
  });

  it('should display list of items showing at least the name', async () => {
    const mockData: ApiElement[] = [
      { id: '1', name: 'John Doe', avatar: 'https://example.com/avatar1.png' },
      { id: '2', name: 'Jane Smith', avatar: 'https://example.com/avatar2.png' }
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    render(<CustomList />);

    await waitFor(() => {
      expect(screen.getByText('Name: John Doe')).toBeTruthy();
      expect(screen.getByText('Name: Jane Smith')).toBeTruthy();
    });
  });

  it('should display ID and name for each item', async () => {
    const mockData: ApiElement[] = [
      { id: '1', name: 'John Doe', avatar: 'https://example.com/avatar1.png' }
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    render(<CustomList />);

    await waitFor(() => {
      expect(screen.getByText('ID: 1')).toBeTruthy();
      expect(screen.getByText('Name: John Doe')).toBeTruthy();
    });
  });

  it('should display error message when request fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<CustomList />);

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeTruthy();
    });
  });

  it('should display "No data to show" when API returns empty array', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    render(<CustomList />);

    await waitFor(() => {
      expect(screen.getByText('No data to show')).toBeTruthy();
    });
  });

  it('should display error when response is not ok', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    render(<CustomList />);

    await waitFor(() => {
      expect(screen.getByText(/Error: HTTP error! status: 404/)).toBeTruthy();
    });
  });
});